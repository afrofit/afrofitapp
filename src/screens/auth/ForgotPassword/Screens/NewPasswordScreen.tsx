import * as React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {BaseButton} from '../../../../components/Buttons/BaseButton';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {CustomInput} from '../../../../components/Form/Inputs/CustomInput';
import Spacer from '../../../../components/Library/Spacer';
import {EMAIL_REGEX} from '../../../../constants/regex';
import {logIn} from '../../../../features/auth/log-in-user-thunk';
import {setNewPassword} from '../../../../features/auth/reset-password/set-new-password-thunk';
import {theme} from '../../../../theme/theme';
import {navigationType} from '../ForgotPasswordScreen';

interface Props {}

export const NewPasswordScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const mainPassword = watch('password');

  const onSubmit: SubmitHandler<FieldValues> = formData => {
    console.log('PasswordData', formData);
    const {password} = formData;
    dispatch(setNewPassword(password));
  };

  return (
    <>
      <BaseFont color={theme.COLORS.gray_300} variant="small-bold-paragraph">
        Enter your new password.
      </BaseFont>
      <Spacer h={30} />
      <CustomInput
        name="password"
        placeholder="Your password..."
        label="Password"
        mode="password"
        control={control}
        rules={{required: true}}
      />
      <CustomInput
        name="confirmPassword"
        placeholder="Re-enter password..."
        label="Confirm"
        mode="password"
        control={control}
        rules={{
          required: true,
          validate: (value: any) =>
            value === mainPassword || 'Passwords must match!',
        }}
      />

      <BaseButton text="Change password" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
