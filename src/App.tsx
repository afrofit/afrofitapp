import 'react-native-gesture-handler';

import * as React from 'react';
import Purchases from 'react-native-purchases';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import {Platform} from 'react-native';

import {IOS_REVCAT_KEY, ANDROID_REVCAT_KEY} from 'react-native-dotenv';

export const App = () => {
  React.useEffect(() => {
    Purchases.setDebugLogsEnabled(true);

    if (Platform.OS === 'ios') {
      Purchases.setup(IOS_REVCAT_KEY);
    } else if (Platform.OS === 'android') {
      Purchases.setup(ANDROID_REVCAT_KEY);
    }
  }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
