import * as React from 'react';
import {Keyboard} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {VerifyStackParamList} from '../../../navigator/VerifyUserNavigator';
import {PageImaged} from '../../../components/Page/PageImaged';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {AuthScreensHeader} from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {createAccountThunk} from '../../../features/auth/create-account-thunk';
import {useDispatch} from 'react-redux';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {ClearButton} from '../../../components/Buttons/ClearButton';
import {verifyUserThunk} from '../../../features/auth/verify-user-thunk';

type navigationType = StackNavigationProp<
  VerifyStackParamList,
  'Verify' | 'VerifySuccess'
>;

interface Props {}

export const VerifyCodeScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // console.log('Dataa', +data.code);
    Keyboard.dismiss();
    dispatch(verifyUserThunk(data));
  };

  const handleResendCode = async () => {};

  return (
    <PageImaged onPress={() => Keyboard.dismiss()}>
      <AuthScreensHeader title="Verify Code" />
      <CustomInput
        name="code"
        placeholder="Enter 6-digit code..."
        label="Code"
        control={control}
        rules={{
          required: true,
          minLength: 6,
          maxLength: 6,
          min: 100000,
          max: 999999,
        }}
        mode="numeric"
        maxLength={6}
      />
      <ClearButton
        text="Resend Code?"
        variant="gray"
        onPress={handleResendCode}
      />
      <BaseButton text="Verify Code" onPress={handleSubmit(onSubmit)} />
    </PageImaged>
  );
};
