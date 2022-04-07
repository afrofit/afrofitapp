import * as React from 'react';
import {Button, Keyboard} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ClearButton} from '../../../components/Buttons/ClearButton';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {AuthScreensHeader} from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {PageImaged} from '../../../components/Page/PageImaged';
import {EMAIL_REGEX} from '../../../constants/regex';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {SubmitHandler, FieldValues, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {logIn} from '../../../features/auth/log-in-user-thunk';

type navigationType = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {}

export const LoginScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    dispatch(logIn(data));
  };

  return (
    <PageImaged onPress={() => Keyboard.dismiss()}>
      <AuthScreensHeader title="Sign In" />

      <CustomInput
        name="email"
        placeholder="Your email..."
        label="Email"
        control={control}
        rules={{required: true, pattern: EMAIL_REGEX}}
      />
      <CustomInput
        name="password"
        placeholder="Your password..."
        label="Password"
        mode="password"
        control={control}
        rules={{required: true}}
      />

      <BaseButton text="Log me in" onPress={handleSubmit(onSubmit)} />
      <ClearButton
        text="Don't have an account?"
        variant="gray"
        onPress={() => navigation.navigate('Signup')}
      />
    </PageImaged>
  );
};
