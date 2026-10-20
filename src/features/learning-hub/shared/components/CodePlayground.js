import AppPressable from '@components/AppPressable';
// Try-it editor for HTML and CSS lessons: type code, press Run, see the result instantly.
// HTML/CSS are rendered (not compiled), so a WebView is the "compiler". Local HTML only, JS off.
//   CSS mode (default): { type: 'playground', title, task, html, baseCss, starter, checks, hint }
//     the learner edits CSS; `html` is the fixed page it styles.
//   HTML mode:          { type: 'playground', mode: 'html', title, task, baseCss, starter, checks, hint }
//     the learner edits the HTML itself (`html` is not used).
//   checks: regex, string, or function(text). The text is lowercase, comments removed, spaces collapsed.
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const getWebView = () => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
};

const buildPage = (code, html, baseCss = '', mode = 'css') =>
  mode === 'html'
    ? `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:Arial,sans-serif;margin:12px}${baseCss}</style>
</head><body>${code.replace(/<script[\s\S]*?(<\/script>|$)/gi, '')}</body></html>`
    : `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:Arial,sans-serif;margin:12px}${baseCss}</style>
<style>${code.replace(/<\/style/gi, '')}</style>
</head><body>${html}</body></html>`;

const normalizeCssForCheck = (css = '', mode = 'css') =>
  css
    .replace(mode === 'html' ? /<!--[\s\S]*?-->/g : /\/\*[\s\S]*?\*\//g, '')
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

export default function CodePlayground({ title, task, html, baseCss, starter, checks, hint, mode = 'css' }) {
  const [code, setCode] = useState(starter);
  const [ran, setRan] = useState(starter); // CSS shown in the preview
  const [passed, setPassed] = useState(null); // null = not run yet
  const isWeb = Platform.OS === 'web';
  const isHtml = mode === 'html';
  const WebViewComponent = getWebView();

  const run = () => {
    const normalized = normalizeCssForCheck(code, mode);
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

  const previewPage = buildPage(ran, html, baseCss, mode);

  const previewContent = isWeb ? (
    <iframe
      key={ran}
      title="Preview"
      srcDoc={previewPage}
      style={styles.iframe}
      sandbox={isHtml ? 'allow-same-origin' : 'allow-scripts allow-same-origin'}
    />
  ) : WebViewComponent ? (
    <WebViewComponent
      key={ran}
      source={{ html: previewPage }}
      originWhitelist={['*']}
      javaScriptEnabled={false}
      onShouldStartLoadWithRequest={(request) => !/^https?:/i.test(request.url)}
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
        <AppPressable style={styles.runButton} onPress={run} activeOpacity={0.8}>
          <Text style={styles.runText}>▶ Run</Text>
        </AppPressable>
        <AppPressable style={styles.resetButton} onPress={reset} activeOpacity={0.8}>
          <Text style={styles.resetText}>Reset</Text>
        </AppPressable>
      </View>

      <Text style={styles.previewLabel}>Preview</Text>
      <View style={styles.preview}>{previewContent}</View>

      {passed === true && <Text style={[styles.feedback, { color: GREEN }]}>Correct! Your {isHtml ? 'HTML' : 'CSS'} does it.</Text>}
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
