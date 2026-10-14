// Try-it editor for CSS lessons: type CSS, press Run, see the result instantly.
// CSS is rendered (not compiled), so a WebView is the "compiler". Local HTML only, JS off.
//   activity = { type: 'playground', title, task, html, baseCss, starter, checks: [/regex/i], hint }
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const getWebView = () => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
};

const buildPage = (css, html, baseCss = '') =>
  `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:Arial,sans-serif;margin:12px}${baseCss}</style>
<style>${css.replace(/<\/style/gi, '')}</style>
</head><body>${html}</body></html>`;

const normalizeCssForCheck = (css = '') =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const evaluateCheck = (check, cssText) => {
  if (check instanceof RegExp) {
    const safeCheck = new RegExp(check.source, check.flags.replace(/g/g, ''));
    safeCheck.lastIndex = 0;
    return safeCheck.test(cssText);
  }

  if (typeof check === 'string') {
    return cssText.includes(check.toLowerCase());
  }

  if (typeof check === 'function') {
    return Boolean(check(cssText));
  }

  return Boolean(check);
};

export default function CodePlayground({ title, task, html, baseCss, starter, checks, hint }) {
  const [code, setCode] = useState(starter);
  const [ran, setRan] = useState(starter); // CSS shown in the preview
  const [passed, setPassed] = useState(null); // null = not run yet
  const isWeb = Platform.OS === 'web';
  const WebViewComponent = getWebView();

  const run = () => {
    const normalized = normalizeCssForCheck(code);
    setRan(code);
    if (checks?.length) {
      setPassed(checks.every((check) => evaluateCheck(check, normalized)));
    }
  };

  const reset = () => {
    setCode(starter);
    setRan(starter);
    setPassed(null);
  };

  const previewPage = buildPage(ran, html, baseCss);

  const previewContent = isWeb ? (
    <iframe
      key={ran}
      title="CSS preview"
      srcDoc={previewPage}
      style={styles.iframe}
      sandbox="allow-scripts allow-same-origin"
    />
  ) : WebViewComponent ? (
    <WebViewComponent
      key={ran}
      source={{ html: previewPage }}
      originWhitelist={['*']}
      javaScriptEnabled={false}
      scrollEnabled={false}
      style={styles.web}
    />
  ) : (
    <Text style={styles.webFallback}>Preview unavailable on this platform.</Text>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TRY IT · LIVE EDITOR</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}

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

      <Text style={styles.previewLabel}>Preview</Text>
      <View style={styles.preview}>{previewContent}</View>

      {passed === true && <Text style={[styles.feedback, { color: GREEN }]}>Correct! Your CSS does it.</Text>}
      {passed === false && (
        <Text style={[styles.feedback, { color: RED }]}>
          Not quite yet. {hint || 'Re-read the task and try again.'}
        </Text>
      )}
    </View>
  );
}

const mono = Platform.select({ ios: 'Menlo', android: 'monospace' });

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#E2D9FF', borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  title: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 4 },
  task: { fontSize: 12, lineHeight: 18, color: '#555555', marginBottom: 10 },
  editor: {
    backgroundColor: '#211A38',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    minHeight: 130,
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
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD6FF',
    backgroundColor: LIGHT_PURPLE,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  web: { flex: 1, backgroundColor: '#FFFFFF' },
  iframe: {
    width: '100%',
    height: '100%',
    display: 'block',
    alignSelf: 'stretch',
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  webFallback: {
    fontSize: 12,
    fontWeight: '600',
    color: RED,
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 18,
  },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 10 },
});
