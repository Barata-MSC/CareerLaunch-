import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Welcome Screen/WelcomeScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen
        onGetStarted={() => Alert.alert('Get started pressed')}
        onLogin={() => Alert.alert('Login pressed')}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
