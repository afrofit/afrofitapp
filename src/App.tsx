import 'react-native-gesture-handler';

import * as React from 'react';

import {Provider} from 'react-redux';

import STORE from './store/store';
import {Index} from './Index';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={STORE}>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </Provider>
  );
};
