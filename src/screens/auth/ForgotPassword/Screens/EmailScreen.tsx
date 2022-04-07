import * as React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {BaseButton} from '../../../../components/Buttons/BaseButton';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {CustomInput} from '../../../../components/Form/Inputs/CustomInput';
import Spacer from '../../../../components/Library/Spacer';
import {EMAIL_REGEX} from '../../../../constants/regex';
import {logIn} from '../../../../features/auth/log-in-user-thunk';
import {theme} from '../../../../theme/theme';

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<null>>;
}

export const EmailScreen: React.FC<Props> = ({setEmail}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = formData => {
    console.log('EmailData', formData);
    // dispatch(logIn(data));
  };

  return (
    <>
      <BaseFont color={theme.COLORS.gray_300} variant="small-bold-paragraph">
        Your email will help us verify your account.
      </BaseFont>
      <Spacer h={30} />
      <CustomInput
        name="email"
        placeholder="Your email..."
        label="Email"
        control={control}
        rules={{required: true, pattern: EMAIL_REGEX}}
      />

      <BaseButton text="Send me reset code" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
