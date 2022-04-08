import * as React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {BaseButton} from '../../../../components/Buttons/BaseButton';
import {ClearButton} from '../../../../components/Buttons/ClearButton';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {CustomInput} from '../../../../components/Form/Inputs/CustomInput';
import Spacer from '../../../../components/Library/Spacer';
import {LocalLNotifier} from '../../../../components/Notifiers/LocalNotifier';
import {EMAIL_REGEX} from '../../../../constants/regex';
import {logIn} from '../../../../features/auth/log-in-user-thunk';
import {resendEmailResetVerifyCode} from '../../../../features/auth/reset-password/resend-password-reset-code-thunk.ts';
import {verifyPasswordResetCode} from '../../../../features/auth/reset-password/verify-password-reset-code-thunk';
import {
  getResendPasswordResetCodeSuccess,
  setResendPasswordResetCodeSuccess,
} from '../../../../features/auth/user.slice';
import {theme} from '../../../../theme/theme';

interface Props {
  email: string | null;
}

export const CodeScreen: React.FC<Props> = ({email}) => {
  const dispatch = useDispatch();

  const resendEmailVerifyCodeStatus = useSelector(
    getResendPasswordResetCodeSuccess,
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = formData => {
    const {code} = formData;
    dispatch(verifyPasswordResetCode(+code));
    // setEmail(email);
    return Keyboard.dismiss();
  };

  React.useEffect(() => {
    console.log(email);
  }, [email]);

  const handleResendCode = () => {
    email && dispatch(resendEmailResetVerifyCode(email));
  };

  const handleClearErrors = () => {
    dispatch(setResendPasswordResetCodeSuccess(false));
  };

  return (
    <>
      <BaseFont color={theme.COLORS.gray_300} variant="small-bold-paragraph">
        Enter the code we sent to your email.
      </BaseFont>
      <Spacer h={30} />
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
        onFocus={handleClearErrors}
      />

      <LocalLNotifier
        visible={resendEmailVerifyCodeStatus}
        message="Code resent!"
      />

      {!resendEmailVerifyCodeStatus && (
        <ClearButton
          text="Resend code"
          variant="white"
          onPress={handleResendCode}
        />
      )}

      <BaseButton text="Verify code" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
