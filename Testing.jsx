import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Testing = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/zorotesting.jpg')} 
        style={styles.logo} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100, // Optional for local, but good practice
  },
});

export default Testing; 