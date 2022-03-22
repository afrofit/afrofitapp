import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

export const App = () => {
  return <Text style={styles.text}>The App Starts for the last time</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
