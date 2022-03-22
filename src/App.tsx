import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Page} from './components/Page/Page';

export const App = () => {
  return (
    <Page>
      <Text style={styles.text}>
        The App Starts for the VERY NAUGHT last time
      </Text>
    </Page>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
