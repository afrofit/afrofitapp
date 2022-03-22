import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from '../constants/routes';
import {LoginScreen} from '../screens/auth/Login/Login.Screen';
import {WelcomeScreen} from '../screens/landing/Welcome.Screen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

const {Screen, Navigator} = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Screen name={'Welcome'} component={WelcomeScreen} />
    <Screen name={'Login'} component={LoginScreen} />
  </Navigator>
);

export default AuthNavigator;
