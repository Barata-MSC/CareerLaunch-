import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Speed from './Speed';


export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="auto" />
      </View>
      <View>
        <Speed />
      </View>
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
