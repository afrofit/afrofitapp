import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import AuthNavigator from './navigator/AuthNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
