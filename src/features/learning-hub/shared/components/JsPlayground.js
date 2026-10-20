import AppPressable from '@components/AppPressable';
// Run-JavaScript editor for JS lessons: type code, press Run, read the console output.
// Code runs in a sandboxed iframe (web) or hidden WebView (app), never in the app itself,
// so a mistake like an infinite loop cannot freeze the app (it is stopped after 3 seconds).
//   activity = { type: 'jsRunner', title, task, starter, expected: ['line', ...], checks: [/regex/], hint, node }
// expected = the exact lines the code must print. checks = patterns the code must contain.
// wait = ms to let async code (timers, promises) finish before checking; default 0.
//
// Optional `node` turns on a Node.js practice mode (for the Node.js course). Real files and
// servers cannot run in a phone app, so this mode provides safe stand-ins:
//   - require('fs') and require('fs/promises') use a small in-memory disk
//   - require('http') and require('express') answer sample requests instead of opening a port
//   - require('./name') loads one of the provided files
//   - document and window are undefined, like in Node.js
//   node = { disk: { 'note.txt': 'text' }, files: { './math': 'module code' },
//            requests: [{ method: 'GET', path: '/' }, { method: 'POST', path: '/users', body: {} }],
//            wait: 400 }  // wait = ms to let async code finish
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

const TIMEOUT_MS = 3000;

// Stand-ins for Node.js modules (only used when an activity has `node`)
const buildNodeShim = (node) => {
  const cfg = JSON.stringify({
    files: node.files || {},
    disk: node.disk || {},
    requests: node.requests || [],
  }).replace(/</g, '\\u003c');

  return `
  var CFG = ${cfg};
  var disk = {};
  Object.keys(CFG.disk).forEach(function (k) { disk[k] = CFG.disk[k]; });
  var cache = {};

  function noFile(p) {
    var e = new Error("ENOENT: no such file or directory, open '" + p + "'");
    e.code = 'ENOENT';
    return e;
  }
  var fs = {
    writeFile: function (p, d, cb) {
      setTimeout(function () { disk[p] = String(d); if (cb) cb(null); }, 10);
    },
    readFile: function (p, enc, cb) {
      if (typeof enc === 'function') cb = enc;
      setTimeout(function () {
        if (!(p in disk)) cb(noFile(p)); else cb(null, disk[p]);
      }, 10);
    },
    promises: {
      writeFile: function (p, d) {
        return new Promise(function (ok) { setTimeout(function () { disk[p] = String(d); ok(); }, 10); });
      },
      readFile: function (p) {
        return new Promise(function (ok, fail) {
          setTimeout(function () { if (!(p in disk)) fail(noFile(p)); else ok(disk[p]); }, 10);
        });
      }
    }
  };

  function makeRes(label) {
    var r = { statusCode: 200 };
    function finish(body) { console.log(label + ' -> ' + r.statusCode + ' ' + body); return r; }
    r.status = function (c) { r.statusCode = c; return r; };
    r.writeHead = function (c) { r.statusCode = c; return r; };
    r.setHeader = function () { return r; };
    r.send = function (b) { return finish(typeof b === 'string' ? b : JSON.stringify(b)); };
    r.json = function (o) { return finish(JSON.stringify(o)); };
    r.end = function (b) { return finish(b === undefined ? '' : String(b)); };
    return r;
  }
  function runRequests(handle) {
    CFG.requests.forEach(function (rq) {
      var req = { method: rq.method, url: rq.path, path: rq.path, body: rq.body || {} };
      handle(req, makeRes(rq.method + ' ' + rq.path));
    });
  }

  var http = {
    createServer: function (cb) {
      return {
        listen: function (port, done) {
          console.log('Server listening on port ' + port);
          runRequests(cb);
          if (done) done();
          return this;
        }
      };
    }
  };

  function express() {
    var routes = [];
    var mws = [];
    var app = {};
    ['get', 'post', 'put', 'delete'].forEach(function (m) {
      app[m] = function (path, h) { routes.push({ m: m.toUpperCase(), p: path, h: h }); return app; };
    });
    app.use = function (fn) { mws.push(fn); return app; };
    app.listen = function (port, done) {
      console.log('Server listening on port ' + port);
      runRequests(function (req, res) {
        var i = 0;
        function next() {
          if (i < mws.length) { return mws[i++](req, res, next); }
          var hit = routes.filter(function (x) { return x.m === req.method && x.p === req.path; })[0];
          if (!hit) { return res.status(404).send('Cannot ' + req.method + ' ' + req.path); }
          hit.h(req, res);
        }
        next();
      });
      if (done) done();
      return app;
    };
    return app;
  }
  express.json = function () { return function (req, res, next) { next(); }; };

  var builtins = { fs: fs, 'fs/promises': fs.promises, http: http, express: express };
  window.require = function (name) {
    if (builtins[name]) return builtins[name];
    var key = name.slice(-3) === '.js' ? name.slice(0, -3) : name;
    if (cache[key]) return cache[key].exports;
    if (!(key in CFG.files)) throw new Error("Cannot find module '" + name + "'");
    var m = { exports: {} };
    cache[key] = m;
    new Function('module', 'exports', 'require', CFG.files[key])(m, m.exports, window.require);
    return m.exports;
  };
  window.module = { exports: {} };
  window.exports = window.module.exports;
`;
};

// The page that runs the learner's code and sends console output back as JSON messages
const buildRunner = (code, run, node, waitMs) => {
  const safeCode = JSON.stringify(code).replace(/</g, '\\u003c');
  const wait = waitMs !== undefined ? waitMs : node ? (node.wait === undefined ? 400 : node.wait) : 0;
  const make = node
    ? `new Function('document', 'window', 'navigator', ${safeCode})()`
    : `new Function(${safeCode})()`;

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
  window.addEventListener('unhandledrejection', function (e) {
    send('error', String((e.reason && e.reason.message) || e.reason));
  });
  ${node ? buildNodeShim(node) : ''}
  try { ${make}; }
  catch (e) { send('error', e.name + ': ' + e.message); }
  setTimeout(function () { send('done', ''); }, ${wait});
})();
<\/script></body></html>`;
};

export default function JsPlayground({ title, task, starter, expected, checks, hint, node, wait }) {
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
    const page = buildRunner(codeRef.current, runId, node, wait);
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
      <Text style={styles.label}>{node ? 'TRY IT · NODE.JS PRACTICE MODE' : 'TRY IT · JAVASCRIPT'}</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}
      {!!node && (
        <Text style={styles.note}>
          Practice mode: files use a small in-memory disk, and servers answer sample requests instead of opening a
          port.
        </Text>
      )}

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
        <AppPressable style={styles.runButton} onPress={run} activeOpacity={0.8}>
          <Text style={styles.runText}>▶ Run</Text>
        </AppPressable>
        <AppPressable style={styles.resetButton} onPress={reset} activeOpacity={0.8}>
          <Text style={styles.resetText}>Reset</Text>
        </AppPressable>
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
  note: { fontSize: 11, lineHeight: 16, color: '#8A8A8A', marginBottom: 10 },
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
