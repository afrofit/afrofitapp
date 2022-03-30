import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {VerifyCodeScreen} from '../screens/auth/VerifyCode/VerifyCode.Screen';
import {VerifyCodeSuccessScreen} from '../screens/notify/VerifyCodeSuccessScreen';

export type VerifyStackParamList = {
  Verify: undefined;
  VerifySuccess: undefined;
};

const {Screen, Navigator} = createStackNavigator<VerifyStackParamList>();

const VerifyUserNavigator = () => (
  <Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Screen name={'Verify'} component={VerifyCodeScreen} />
    <Screen name={'VerifySuccess'} component={VerifyCodeSuccessScreen} />
  </Navigator>
);

export default VerifyUserNavigator;
