import * as React from 'react';

import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {BaseFont} from '../../../components/Font/BaseFont';
import {Page} from '../../../components/Page/Page';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {useForm} from 'react-hook-form';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import ClearButton from '../../../components/Buttons/ClearButton';
import {Modal} from '../../../components/Modal/Modal';
import AuthScreensHeader from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {theme} from '../../../theme/theme';
import {Keyboard} from 'react-native';
import {PageImaged} from '../../../components/Page/PageImaged';

type navigationType = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {}

export const SignupScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log('Errors', errors);

  const onSignInPressed = (data: any) => {
    console.log(data);
  };

  // on Submit, we trigger a modal that confirms whether they agree to terms or not

  return (
    <>
      {/* <Modal> */}
      {/* <BaseFont>Something</BaseFont>
        <BaseFont>Something</BaseFont>
        <BaseFont>Something</BaseFont> */}
      {/* </Modal> */}
      <PageImaged onPress={() => Keyboard.dismiss()}>
        <AuthScreensHeader title="Sign Up" />
        <CustomInput
          name="username"
          placeholder="Your unique username..."
          label="Username"
          control={control}
        />
        <CustomInput
          name="email"
          placeholder="Your email..."
          label="Email"
          control={control}
        />
        <CustomInput
          name="password"
          placeholder="Your password..."
          label="Password"
          mode="password"
          control={control}
        />

        <BaseButton
          text="Create Account"
          onPress={handleSubmit(onSignInPressed)}
        />
        <ClearButton
          text="Already have an account?"
          variant="gray"
          onPress={() => navigation.navigate('Welcome')}
        />
      </PageImaged>
    </>
  );
};
