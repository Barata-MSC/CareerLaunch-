import AppPressable from '@components/AppPressable';
// Run-Python editor for Python / Pandas lessons: type code, press Run, read the printed output.
// Python runs with Pyodide (Python compiled to WebAssembly) inside a hidden, sandboxed
// WebView (app) or iframe (web), never in the app itself. It needs an internet connection:
// the first Run downloads Python and Pandas (can take up to a minute), later Runs are fast.
// An infinite loop is stopped after 10 seconds and the runner restarts.
//   activity = { type: 'pyRunner', title, task, starter, expected: ['line', ...], checks: [/regex/], hint, files }
// expected = the exact lines the code must print. checks = patterns the code must contain.
// files = { 'data.csv': 'text' } are written to the runner's disk before each Run, so
// pd.read_csv('data.csv') works like in the lesson. Every Run starts with a clean namespace.
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { PURPLE, GREEN, RED } from '../styles';

const getWebView = () => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
};

const PYODIDE_VERSION = '0.28.1'; // pinned on purpose; update only after testing
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
const PACKAGES = ['pandas'];
const LOAD_TIMEOUT_MS = 120000; // first load downloads Python + Pandas
const RUN_TIMEOUT_MS = 10000;

// The page that loads Python once, then runs each learner program and sends output back as JSON
const buildRunner = () => `<!DOCTYPE html><html><body>
<script src="${PYODIDE_URL}"><\/script>
<script>
(function () {
  var RUN = 0;
  var py = null;
  function send(type, text) {
    var m = JSON.stringify({ run: RUN, type: type, text: text });
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(m);
    else parent.postMessage(m, '*');
  }
  async function init() {
    try {
      py = await loadPyodide();
      await py.loadPackage(${JSON.stringify(PACKAGES)});
      py.setStdout({ batched: function (s) { send('log', s); } });
      py.setStderr({ batched: function (s) { send('warn', s); } });
      send('ready', '');
    } catch (e) {
      send('fatal', String((e && e.message) || e));
    }
  }
  window.__run = async function (code, run, files) {
    RUN = run;
    var scope = null;
    try {
      Object.keys(files || {}).forEach(function (name) { py.FS.writeFile(name, files[name]); });
      scope = py.globals.get('dict')();
      await py.runPythonAsync(code, { globals: scope });
    } catch (e) {
      var lines = String((e && e.message) || e).trim().split('\\n');
      send('error', lines[lines.length - 1]);
    }
    if (scope) scope.destroy();
    send('done', '');
  };
  window.addEventListener('message', function (e) {
    try {
      var m = JSON.parse(e.data);
      if (m && m.cmd === 'run') window.__run(m.code, m.run, m.files);
    } catch (err) {}
  });
  init();
})();
<\/script></body></html>`;

const RUNNER_PAGE = buildRunner();

const clean = (lines) =>
  lines
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');

export default function PyPlayground({ title, task, starter, expected, checks, hint, files }) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | running | done | timeout
  const [passed, setPassed] = useState(null);
  const [mounted, setMounted] = useState(false); // the runner starts at the first Run
  const [runnerKey, setRunnerKey] = useState(0);

  const runRef = useRef(0);
  const linesRef = useRef([]);
  const codeRef = useRef(starter);
  const readyRef = useRef(false);
  const pendingRef = useRef(false);
  const webRef = useRef(null);
  const frameRef = useRef(null);

  const isWeb = Platform.OS === 'web';
  const WebViewComponent = getWebView();

  const addLine = (type, text) => {
    linesRef.current = [...linesRef.current, { type, text }];
    setOutput(linesRef.current);
  };

  const fail = (text) => {
    addLine('error', text);
    setPassed(false);
    setStatus('timeout');
  };

  const finish = () => {
    const lines = linesRef.current;
    const printed = clean(lines.filter((l) => l.type === 'log').map((l) => l.text));

    let ok = !lines.some((l) => l.type === 'error');
    if (expected) ok = ok && printed === clean(expected);
    if (checks) {
      ok = ok && checks.every((re) => new RegExp(re.source, re.flags.replace(/g/g, '')).test(codeRef.current));
    }
    setPassed(ok);
    setStatus('done');
  };

  const dispatch = () => {
    setStatus('running');
    const payload = { cmd: 'run', code: codeRef.current, run: runRef.current, files: files || {} };
    if (isWeb) {
      frameRef.current?.contentWindow?.postMessage(JSON.stringify(payload), '*');
    } else {
      webRef.current?.injectJavaScript(
        `window.__run(${JSON.stringify(payload.code)}, ${payload.run}, ${JSON.stringify(payload.files)}); true;`,
      );
    }
  };

  const handleMessage = (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (!msg) return;
    if (msg.type === 'ready') {
      readyRef.current = true;
      if (pendingRef.current) {
        pendingRef.current = false;
        dispatch();
      }
      return;
    }
    if (msg.type === 'fatal') {
      pendingRef.current = false;
      fail(`Python could not load: ${msg.text}`);
      return;
    }
    if (msg.run !== runRef.current) return; // ignore old runs
    if (msg.type === 'done') return finish();
    addLine(msg.type, msg.text);
  };

  // Web: the iframe reports back with postMessage
  useEffect(() => {
    if (!isWeb) return undefined;
    const onMessage = (e) => {
      if (frameRef.current && e.source !== frameRef.current.contentWindow) return;
      handleMessage(e.data);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  });

  // Stop a load that never finishes, or code that never ends (for example an infinite loop)
  useEffect(() => {
    if (status !== 'loading' && status !== 'running') return undefined;
    const waitingForLoad = status === 'loading';
    const timer = setTimeout(
      () => {
        readyRef.current = false;
        pendingRef.current = false;
        setRunnerKey((k) => k + 1); // restart the runner
        fail(
          waitingForLoad
            ? 'Python did not load. Check your internet connection and try again.'
            : 'Stopped: your code took too long. Check for an infinite loop.',
        );
      },
      waitingForLoad ? LOAD_TIMEOUT_MS : RUN_TIMEOUT_MS,
    );
    return () => clearTimeout(timer);
  }, [status, runnerKey]);

  const run = () => {
    codeRef.current = code;
    runRef.current += 1;
    linesRef.current = [];
    setOutput([]);
    setPassed(null);
    setMounted(true);
    if (readyRef.current) {
      dispatch();
    } else {
      pendingRef.current = true;
      setStatus('loading');
    }
  };

  const reset = () => {
    runRef.current += 1; // anything still running is ignored
    pendingRef.current = false;
    linesRef.current = [];
    setCode(starter);
    setOutput([]);
    setPassed(null);
    setStatus('idle');
  };

  const busy = status === 'loading' || status === 'running';

  let runner = null;
  if (mounted) {
    runner = isWeb ? (
      <iframe
        key={runnerKey}
        ref={frameRef}
        title="Python runner"
        srcDoc={RUNNER_PAGE}
        sandbox="allow-scripts"
        style={{ width: 0, height: 0, border: 0, position: 'absolute' }}
      />
    ) : WebViewComponent ? (
      <WebViewComponent
        key={runnerKey}
        ref={webRef}
        source={{ html: RUNNER_PAGE, baseUrl: 'https://cdn.jsdelivr.net/' }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(e) => handleMessage(e.nativeEvent.data)}
        style={styles.hiddenWeb}
      />
    ) : null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TRY IT · PYTHON</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}

      {!!expected && (
        <View style={styles.goal}>
          <Text style={styles.goalLabel}>Goal output</Text>
          <Text style={styles.goalText}>{expected.join('\n')}</Text>
        </View>
      )}

      <TextInput
        style={styles.editor}
        value={code}
        onChangeText={(text) => {
          setCode(text);
          setPassed(null);
        }}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        textAlignVertical="top"
      />

      <View style={styles.row}>
        <AppPressable
          style={[styles.runButton, busy && styles.runDisabled]}
          onPress={run}
          disabled={busy}
          activeOpacity={0.8}
        >
          <Text style={styles.runText}>{busy ? 'Running…' : '▶ Run'}</Text>
        </AppPressable>
        <AppPressable style={styles.resetButton} onPress={reset} activeOpacity={0.8}>
          <Text style={styles.resetText}>Reset</Text>
        </AppPressable>
      </View>

      <Text style={styles.consoleLabel}>Output</Text>
      <View style={styles.console}>
        {status === 'idle' && <Text style={styles.consoleDim}>Press Run to see the output here.</Text>}
        {status === 'loading' && (
          <Text style={styles.consoleDim}>
            Loading Python and Pandas… The first run needs internet and can take up to a minute.
          </Text>
        )}
        {status === 'running' && <Text style={styles.consoleDim}>Running…</Text>}
        {(status === 'done' || status === 'timeout') && output.length === 0 && (
          <Text style={styles.consoleDim}>(no output) Did you use print()?</Text>
        )}
        {output.map((line, i) => (
          <Text
            key={i}
            style={[styles.consoleText, line.type === 'warn' && styles.warn, line.type === 'error' && styles.error]}
          >
            {line.type === 'error' ? `✖ ${line.text}` : line.text}
          </Text>
        ))}
      </View>

      {runner}

      {passed === true && <Text style={[styles.feedback, { color: GREEN }]}>Correct! Your code does it.</Text>}
      {passed === false && (
        <Text style={[styles.feedback, { color: RED }]}>
          Not quite yet. {hint || 'Compare your output with the goal and try again.'}
        </Text>
      )}
    </View>
  );
}

const mono = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#E2D9FF', borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  title: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 4 },
  task: { fontSize: 12, lineHeight: 18, color: '#555555', marginBottom: 10 },
  goal: { backgroundColor: '#F7F7F7', borderRadius: 8, padding: 10, marginBottom: 10 },
  goalLabel: { fontSize: 10, fontWeight: '700', color: '#929292', marginBottom: 4 },
  goalText: { fontSize: 12, lineHeight: 18, color: '#333333', fontFamily: mono },
  editor: {
    backgroundColor: '#211A38',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    minHeight: 150,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: mono,
  },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
  runButton: { flex: 1, backgroundColor: PURPLE, borderRadius: 10, paddingVertical: 11, alignItems: 'center' },
  runDisabled: { opacity: 0.6 },
  runText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  resetText: { color: PURPLE, fontSize: 13, fontWeight: '700' },
  consoleLabel: { fontSize: 11, fontWeight: '700', color: '#929292', marginTop: 12, marginBottom: 6 },
  console: { backgroundColor: '#111111', borderRadius: 10, padding: 12, minHeight: 70 },
  consoleText: { color: '#FFFFFF', fontSize: 12, lineHeight: 18, fontFamily: mono },
  consoleDim: { color: '#8A8A8A', fontSize: 12, lineHeight: 18 },
  warn: { color: '#FBBF24' },
  error: { color: '#F97316' },
  hiddenWeb: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 10 },
});
