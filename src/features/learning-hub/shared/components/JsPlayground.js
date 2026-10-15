// Run-JavaScript editor for JS lessons: type code, press Run, read the console output.
// Code runs in a sandboxed iframe (web) or hidden WebView (app), never in the app itself,
// so a mistake like an infinite loop cannot freeze the app (it is stopped after 3 seconds).
//   activity = { type: 'jsRunner', title, task, starter, expected: ['line', ...], checks: [/regex/], hint }
// expected = the exact lines the code must print. checks = patterns the code must contain.
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { PURPLE, GREEN, RED } from '../styles';

const getWebView = () => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
};

const TIMEOUT_MS = 3000;

// The page that runs the learner's code and sends console output back as JSON messages
const buildRunner = (code, run) => {
  const safeCode = JSON.stringify(code).replace(/</g, '\\u003c');
  return `<!DOCTYPE html><html><body><script>
(function () {
  var RUN = ${run};
  function send(type, text) {
    var m = JSON.stringify({ run: RUN, type: type, text: text });
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(m);
    else parent.postMessage(m, '*');
  }
  function fmt(v) {
    if (typeof v === 'string') return v;
    try { return (typeof v === 'object' && v !== null) ? JSON.stringify(v) : String(v); }
    catch (e) { return String(v); }
  }
  function join(args) { return Array.prototype.slice.call(args).map(fmt).join(' '); }
  console.log = console.info = function () { send('log', join(arguments)); };
  console.warn = console.error = function () { send('warn', join(arguments)); };
  window.onerror = function (msg) { send('error', String(msg)); return true; };
  try { new Function(${safeCode})(); }
  catch (e) { send('error', e.name + ': ' + e.message); }
  send('done', '');
})();
<\/script></body></html>`;
};

export default function JsPlayground({ title, task, starter, expected, checks, hint }) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | running | done | timeout
  const [passed, setPassed] = useState(null);
  const [runId, setRunId] = useState(0);

  const runRef = useRef(0);
  const linesRef = useRef([]);
  const codeRef = useRef(starter);

  const isWeb = Platform.OS === 'web';
  const WebViewComponent = getWebView();

  const finish = () => {
    const lines = linesRef.current;
    const printed = lines
      .filter((l) => l.type === 'log')
      .map((l) => l.text)
      .join('\n')
      .trim();

    let ok = !lines.some((l) => l.type === 'error');
    if (expected) ok = ok && printed === expected.join('\n');
    if (checks) {
      ok = ok && checks.every((re) => new RegExp(re.source, re.flags.replace(/g/g, '')).test(codeRef.current));
    }
    setPassed(ok);
    setStatus('done');
  };

  const handleMessage = (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (!msg || msg.run !== runRef.current) return; // ignore old runs
    if (msg.type === 'done') return finish();
    linesRef.current = [...linesRef.current, { type: msg.type, text: msg.text }];
    setOutput(linesRef.current);
  };

  // Web: the iframe reports back with postMessage
  useEffect(() => {
    if (!isWeb) return undefined;
    const onMessage = (e) => handleMessage(e.data);
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  });

  // Stop code that never finishes (for example an infinite loop)
  useEffect(() => {
    if (status !== 'running') return undefined;
    const timer = setTimeout(() => {
      linesRef.current = [
        ...linesRef.current,
        { type: 'error', text: 'Stopped: your code took too long. Check for an infinite loop.' },
      ];
      setOutput(linesRef.current);
      setPassed(false);
      setStatus('timeout');
    }, TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status, runId]);

  const run = () => {
    linesRef.current = [];
    codeRef.current = code;
    runRef.current += 1;
    setOutput([]);
    setPassed(null);
    setRunId(runRef.current);
    setStatus('running');
  };

  const reset = () => {
    runRef.current += 1; // anything still running is ignored
    linesRef.current = [];
    setCode(starter);
    setOutput([]);
    setPassed(null);
    setStatus('idle');
  };

  // The runner is only mounted while code is running; unmounting stops it
  let runner = null;
  if (status === 'running') {
    const page = buildRunner(codeRef.current, runId);
    runner = isWeb ? (
      <iframe
        key={runId}
        title="JavaScript runner"
        srcDoc={page}
        sandbox="allow-scripts"
        style={{ width: 0, height: 0, border: 0, position: 'absolute' }}
      />
    ) : WebViewComponent ? (
      <WebViewComponent
        key={runId}
        source={{ html: page }}
        originWhitelist={['*']}
        javaScriptEnabled
        onMessage={(e) => handleMessage(e.nativeEvent.data)}
        style={styles.hiddenWeb}
      />
    ) : null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TRY IT · JAVASCRIPT</Text>
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
        <TouchableOpacity style={styles.runButton} onPress={run} activeOpacity={0.8}>
          <Text style={styles.runText}>▶ Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={reset} activeOpacity={0.8}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.consoleLabel}>Console</Text>
      <View style={styles.console}>
        {status === 'running' && <Text style={styles.consoleDim}>Running…</Text>}
        {status === 'idle' && <Text style={styles.consoleDim}>Press Run to see the output here.</Text>}
        {status !== 'running' && status !== 'idle' && output.length === 0 && (
          <Text style={styles.consoleDim}>(no output) Did you use console.log?</Text>
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
          Not quite yet. {hint || 'Compare your console output with the goal and try again.'}
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
