import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/auth/Login/Login.Screen';
import {WelcomeScreen} from '../screens/landing/Welcome.Screen';
import {SignupScreen} from '../screens/auth/Signup/Signup.Screen';
import {SignupSuccessScreen} from '../screens/notify/SignupSuccessScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  SignupSuccess: undefined;
};

const {Screen, Navigator} = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Screen name={'Welcome'} component={WelcomeScreen} />
    <Screen name={'Signup'} component={SignupScreen} />
    <Screen name={'Login'} component={LoginScreen} />
    <Screen name={'SignupSuccess'} component={SignupSuccessScreen} />
  </Navigator>
);

export default AuthNavigator;
