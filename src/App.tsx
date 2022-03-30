import 'react-native-gesture-handler';

import * as React from 'react';
import Purchases from 'react-native-purchases';

import {Platform} from 'react-native';
import {Provider, useSelector} from 'react-redux';

import STORE from './store/store';
import {Index} from './Index';
import {NavigationContainer} from '@react-navigation/native';

export const App = () => {
  return (
    <Provider store={STORE}>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </Provider>
  );
};
