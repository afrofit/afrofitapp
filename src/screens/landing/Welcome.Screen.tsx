import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button} from 'react-native';

import {AuthStackParamList} from '../../navigator/AuthNavigator';
import {BaseFont} from '../../components/Font/BaseFont';
import {Page} from '../../components/Page/Page';
import {StackNavigationProp} from '@react-navigation/stack';

type navigationType = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {}

export const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<navigationType>();
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Welcome Screen</BaseFont>
      <BaseFont variant="small-caps">This is a good subheading</BaseFont>
      <BaseFont variant="paragraph">This is a paragraph</BaseFont>
      <Button
        title="what a button"
        onPress={() => navigation.navigate('Login')}
      />
    </Page>
  );
};
