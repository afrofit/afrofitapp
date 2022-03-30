import * as React from 'react';
import {Button} from 'react-native';

import {BaseFont} from '../../../components/Font/BaseFont';
import {Page} from '../../../components/Page/Page';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {VerifyStackParamList} from '../../../navigator/VerifyUserNavigator';
import {PageImaged} from '../../../components/Page/PageImaged';

type navigationType = StackNavigationProp<
  VerifyStackParamList,
  'Verify' | 'VerifySuccess'
>;

interface Props {}

export const VerifyCodeScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  return (
    <PageImaged onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Verify Code Screen</BaseFont>
      <Button
        title="what a button"
        onPress={() => navigation.navigate('VerifySuccess')}
      />
    </PageImaged>
  );
};
