import AppPressable from '@components/AppPressable';
// Embedded YouTube video for a lesson. Lessons without `video` show nothing.
//   video = { id, start (seconds), chapter, title, channel }
// Web uses an iframe; the mobile app uses a WebView with an HTML wrapper and a real
// base URL (a bare embed uri can render black). "Open in YouTube" is the fallback.
import React from 'react';
import { View, Text, Linking, StyleSheet, Platform } from 'react-native';
import { PURPLE } from '../styles';

const getWebView = () => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
};

export default function LessonVideo({ video }) {
  if (!video?.id) return null;

  const isWeb = Platform.OS === 'web';
  const WebViewComponent = getWebView();
  const start = video.start || 0;
  const embedUrl = `https://www.youtube.com/embed/${video.id}?start=${start}&rel=0&playsinline=1`;
  // Mobile: privacy-enhanced domain (fixes error 152-4). Origin must match the WebView baseUrl.
  const NATIVE_ORIGIN = 'https://www.youtube-nocookie.com';
  const nativeEmbedUrl = `${NATIVE_ORIGIN}/embed/${video.id}?start=${start}&rel=0&playsinline=1&origin=${encodeURIComponent(NATIVE_ORIGIN)}`;

  const nativeHtml = `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>html,body{margin:0;height:100%;background:#000}
iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}</style>
</head><body>
<iframe src="${nativeEmbedUrl}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</body></html>`;

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Watch</Text>

      <View style={styles.player}>
        {isWeb ? (
          <iframe
            title="Lesson video"
            src={embedUrl}
            style={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : WebViewComponent ? (
          <WebViewComponent
            source={{ html: nativeHtml, baseUrl: NATIVE_ORIGIN }}
            originWhitelist={['*']}
            javaScriptEnabled
            allowsInlineMediaPlayback
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            domStorageEnabled
            setSupportMultipleWindows={false}
            scrollEnabled={false}
            style={styles.web}
          />
        ) : (
          <Text style={styles.webFallback}>Video unavailable on this platform.</Text>
        )}
      </View>

      <Text style={styles.caption}>
        {video.title} · {video.channel}
        {!!video.chapter && `\nChapter: ${video.chapter}`}
      </Text>

      <AppPressable onPress={() => Linking.openURL(`https://youtu.be/${video.id}?t=${start}`).catch(() => {})}>
        <Text style={styles.link}>Open in YouTube</Text>
      </AppPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 18 },
  heading: { fontSize: 15, fontWeight: '700', color: '#222222', marginBottom: 10 },
  // No centering here: it shrinks the native WebView to zero width (the black box)
  player: {
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  web: { width: '100%', height: '100%', backgroundColor: '#000' },
  iframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: '#000',
  },
  webFallback: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 18,
    alignSelf: 'center',
    marginTop: '20%',
  },
  caption: { fontSize: 11, lineHeight: 17, color: '#777777', marginTop: 8 },
  link: { fontSize: 12, fontWeight: '700', color: PURPLE, marginTop: 4 },
});
