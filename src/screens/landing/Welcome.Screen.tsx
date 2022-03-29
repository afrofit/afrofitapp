import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import Purchases, {PurchasesOfferings} from 'react-native-purchases';

import {AuthStackParamList} from '../../navigator/AuthNavigator';
import {BaseFont} from '../../components/Font/BaseFont';
import {Page} from '../../components/Page/Page';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseButton} from '../../components/Buttons/BaseButton';
import {Logo} from '../../components/Elements/Logo';
import {Squigly} from '../../components/Elements/Squigly';
import Spacer from '../../components/Library/Spacer';
import {BackgroundImage} from '../../components/Elements/BackgroundImage';
import {PageImaged} from '../../components/Page/PageImaged';
import {ButtonContainer, Grouper, MidGrouper} from './Welcome.styles';

type navigationType = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {}

export const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<navigationType>();

  return (
    <PageImaged>
      <Grouper>
        <Logo />
      </Grouper>
      <MidGrouper>
        <Squigly />
        <BaseFont variant="tagline" bold>
          Find Rhythm
        </BaseFont>
        <Spacer />
        <BaseFont variant="tagline">Build Fitness</BaseFont>
        <Squigly />
      </MidGrouper>
      <ButtonContainer>
        <BaseButton
          onPress={() => navigation.navigate('Signup')}
          text="Get Started"
          variant="white"
        />
        <BaseButton
          onPress={() => navigation.navigate('Login')}
          text="Continue"
          variant="red"
        />
      </ButtonContainer>
    </PageImaged>
  );
};
