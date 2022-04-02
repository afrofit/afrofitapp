import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {BaseButton} from '../../../components/Buttons/BaseButton';
import {Page} from '../../../components/Page/Page';
import {
  GameScreensStackParamList,
  GameStackParamList,
} from '../../../navigator/GameNavigator';
import PageHeaderLarge from '../../../components/Headers/PageHeaderLarge/PageHeaderLarge';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const MarathonScreen: React.FC<Props> = () => {
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderLarge title="Marathon" />
      <BaseButton
        // onPress={() => navigation.navigate('Login')}
        onPress={() => {}}
        text="Continue"
        variant="red"
      />
    </Page>
  );
};
