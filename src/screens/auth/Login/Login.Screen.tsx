import * as React from 'react';
import {Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {BaseFont} from '../../../components/Font/BaseFont';
import {Page} from '../../../components/Page/Page';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type navigationType = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {}

export const LoginScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Login Screen</BaseFont>
      <Button
        title="what a button"
        onPress={() => navigation.navigate('Welcome')}
      />
    </Page>
  );
};
