// Embedded YouTube video for a lesson. Lessons without `video` show nothing.
//   video = { id, start (seconds), chapter, title, channel }
// "Open in YouTube" is the fallback if the embed is blocked on the device.
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Platform } from 'react-native';
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
            source={{ uri: embedUrl }}
            originWhitelist={['*']}
            javaScriptEnabled
            allowsInlineMediaPlayback
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            domStorageEnabled
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

      <TouchableOpacity onPress={() => Linking.openURL(`https://youtu.be/${video.id}?t=${start}`).catch(() => {})}>
        <Text style={styles.link}>Open in YouTube</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 18 },
  heading: { fontSize: 15, fontWeight: '700', color: '#222222', marginBottom: 10 },
  player: {
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  web: { flex: 1, backgroundColor: '#000' },
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
  },
  caption: { fontSize: 11, lineHeight: 17, color: '#777777', marginTop: 8 },
  link: { fontSize: 12, fontWeight: '700', color: PURPLE, marginTop: 4 },
});
