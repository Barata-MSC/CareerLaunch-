// Live React editor for React lessons: write a component named App, press Run, and use
// the real result in the preview. It runs in a sandboxed iframe (web) or WebView (app).
// React, ReactDOM and Babel load from cdnjs, so the device needs an internet connection
// (Babel is large: the first run can take a few seconds).
//   activity = { type: 'reactRunner', title, task, goal, starter, expectText, click, checks, hint }
// expectText = text the preview must show (string or /regex/). click = { selector, expectText }
// presses that element and checks the text afterwards. checks = patterns the code must contain.
// useState, useEffect and useRef are already available; import lines are ignored.
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

const REACT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js';
const DOM_URL = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js';
const BABEL_URL = 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js';
const TIMEOUT_MS = 15000;

const norm = (s = '') => String(s).replace(/\s+/g, ' ').trim();
const matches = (text, exp) =>
  exp instanceof RegExp
    ? new RegExp(exp.source, exp.flags.replace(/g/g, '')).test(norm(text))
    : norm(text).includes(norm(exp));

// The page that compiles and renders the learner's App, then reports back as JSON messages
const buildPage = (code, run, clickSelector) => {
  const safeCode = JSON.stringify(code).replace(/</g, '\\u003c');
  return `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:Arial,sans-serif;margin:12px}button{font-size:14px;padding:6px 12px}</style>
<script src="${REACT_URL}"><\/script>
<script src="${DOM_URL}"><\/script>
<script src="${BABEL_URL}"><\/script>
</head><body><div id="root"></div><script>
(function () {
  var RUN = ${run};
  function send(type, text) {
    var m = JSON.stringify({ run: RUN, type: type, text: text });
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(m);
    else parent.postMessage(m, '*');
  }
  function shown() { return document.getElementById('root').innerText; }
  window.onerror = function (msg) { send('error', String(msg)); return true; };
  if (!window.React || !window.ReactDOM || !window.Babel) {
    send('error', 'Could not load React. Check your internet connection.');
    send('done', '');
    return;
  }
  try {
    var src = ${safeCode}.replace(/^\\s*import[^\\n]*$/gm, '').replace(/export\\s+default\\s+/g, '');
    var out = Babel.transform(src, { presets: ['react'] }).code;
    var App = new Function('React', 'useState', 'useEffect', 'useRef',
      out + '\\n;return typeof App === "function" ? App : null;')(
      React, React.useState, React.useEffect, React.useRef);
    if (!App) throw new Error('Define a component named App');
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
    setTimeout(function () {
      send('text', shown());
      var sel = ${JSON.stringify(clickSelector || null)};
      var el = sel && document.querySelector(sel);
      if (el) {
        el.click();
        setTimeout(function () { send('after', shown()); send('done', ''); }, 250);
      } else {
        send('done', '');
      }
    }, 400);
  } catch (e) {
    send('error', e.name + ': ' + e.message);
    send('done', '');
  }
})();
<\/script></body></html>`;
};

export default function ReactPlayground({ title, task, goal, starter, expectText, click, checks, hint }) {
  const [code, setCode] = useState(starter);
  const [status, setStatus] = useState('idle'); // idle | running | done | timeout
  const [passed, setPassed] = useState(null);
  const [problem, setProblem] = useState('');
  const [runId, setRunId] = useState(0);

  const runRef = useRef(0);
  const codeRef = useRef(starter);
  const textRef = useRef(null);
  const afterRef = useRef(null);
  const errorRef = useRef('');

  const isWeb = Platform.OS === 'web';
  const WebViewComponent = getWebView();

  const finish = () => {
    let ok = !errorRef.current && textRef.current !== null;
    if (ok && expectText !== undefined) ok = matches(textRef.current, expectText);
    if (ok && click) ok = afterRef.current !== null && matches(afterRef.current, click.expectText);
    if (ok && checks) {
      ok = checks.every((re) => new RegExp(re.source, re.flags.replace(/g/g, '')).test(codeRef.current));
    }
    setProblem(errorRef.current);
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
    if (msg.type === 'text') textRef.current = msg.text;
    else if (msg.type === 'after') afterRef.current = msg.text;
    else if (msg.type === 'error') errorRef.current = errorRef.current || msg.text;
    else if (msg.type === 'done') finish();
  };

  // Web: the iframe reports back with postMessage
  useEffect(() => {
    if (!isWeb) return undefined;
    const onMessage = (e) => handleMessage(e.data);
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  });

  // Stop a run that never finishes (no internet, or an infinite loop)
  useEffect(() => {
    if (status !== 'running') return undefined;
    const timer = setTimeout(() => {
      setProblem('Stopped: it took too long. Check your internet connection and your code for infinite loops.');
      setPassed(false);
      setStatus('timeout');
    }, TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status, runId]);

  const run = () => {
    runRef.current += 1;
    codeRef.current = code;
    textRef.current = null;
    afterRef.current = null;
    errorRef.current = '';
    setProblem('');
    setPassed(null);
    setRunId(runRef.current);
    setStatus('running');
  };

  const reset = () => {
    runRef.current += 1; // anything still running is ignored
    setCode(starter);
    setProblem('');
    setPassed(null);
    setStatus('idle');
  };

  const showPreview = status === 'running' || status === 'done';
  let preview = null;
  if (showPreview) {
    const page = buildPage(codeRef.current, runId, click?.selector);
    preview = isWeb ? (
      <iframe
        key={runId}
        title="React preview"
        srcDoc={page}
        sandbox="allow-scripts"
        style={{ width: '100%', height: '100%', border: 0, display: 'block', backgroundColor: '#FFFFFF' }}
      />
    ) : WebViewComponent ? (
      <WebViewComponent
        key={runId}
        source={{ html: page }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(e) => handleMessage(e.nativeEvent.data)}
        style={styles.web}
      />
    ) : (
      <Text style={styles.dim}>Preview unavailable on this platform.</Text>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TRY IT · REACT</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}

      {!!goal && (
        <View style={styles.goal}>
          <Text style={styles.goalLabel}>Goal</Text>
          <Text style={styles.goalText}>{goal}</Text>
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

      <Text style={styles.previewLabel}>
        Preview{status === 'running' ? ' · loading React (needs internet)…' : ''}
      </Text>
      <View style={styles.preview}>
        {preview || <Text style={styles.dim}>Press Run to see your component here.</Text>}
      </View>

      {!!problem && <Text style={styles.problem}>✖ {problem}</Text>}
      {passed === true && <Text style={[styles.feedback, { color: GREEN }]}>Correct! Your component does it.</Text>}
      {passed === false && (
        <Text style={[styles.feedback, { color: RED }]}>
          Not quite yet. {hint || 'Compare your preview with the goal and try again.'}
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
  goalText: { fontSize: 12, lineHeight: 18, color: '#333333' },
  editor: {
    backgroundColor: '#211A38',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    minHeight: 190,
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
  previewLabel: { fontSize: 11, fontWeight: '700', color: '#929292', marginTop: 12, marginBottom: 6 },
  preview: {
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD6FF',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  web: { flex: 1, backgroundColor: '#FFFFFF' },
  dim: { color: '#8A8A8A', fontSize: 12, lineHeight: 18, textAlign: 'center', paddingHorizontal: 12 },
  problem: { fontSize: 12, lineHeight: 18, color: '#F97316', fontFamily: mono, marginTop: 10 },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 10 },
});
