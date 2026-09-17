import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function Speed() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEADLINE NA BUKAS MAMAA!!!</Text>
      <Image 
        source={require('./assets/Speed.gif')}
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000', // Dark background for a sleek, fast look
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 200,
  },
  title: {
    color: '#FF3B30', // Action red
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 4,
    marginBottom: 20,
  },
  gif: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
});