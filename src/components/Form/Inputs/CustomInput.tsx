import * as React from 'react';
import {useForm, Controller, FieldError} from 'react-hook-form';

import {theme} from '../../../theme/theme';
import {BaseFont} from '../../Font/BaseFont';
import {Placer} from '../../Library/Placer';
import Spacer from '../../Library/Spacer';
import {Field, Input, LabelText} from './CustomInput.styles';
import {ICustomImputProps, KeyboardTypes} from './CustomInput.types';

export const CustomInput: React.FC<ICustomImputProps> = ({
  name,
  placeholder,
  label,
  mode = 'regular',
  control,
  rules = {},
  maxLength = 50,
  onFocus,
}) => {
  const keyboardType: KeyboardTypes =
    mode === 'email'
      ? 'email-address'
      : mode === 'numeric'
      ? 'numeric'
      : 'default';

  const renderErrorMessage = (error: FieldError) => {
    console.log(error);
    return error.type === 'minLength'
      ? 'Too Short!'
      : error.type === 'maxLength'
      ? 'Too Long!'
      : error.type === 'required'
      ? 'Required!'
      : error.type === 'validate'
      ? 'No match!'
      : 'Invalid';
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <Field error={!!error}>
          <LabelText error={!!error}>
            {error ? renderErrorMessage(error) : label}
          </LabelText>
          <Input
            autoCapitalize="none"
            placeholder={placeholder}
            placeholderTextColor={theme.COLORS.gray_300}
            secureTextEntry={mode === 'password'}
            keyboardType={keyboardType}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            maxLength={maxLength}
            onFocus={onFocus}
          />
        </Field>
      )}
    />
  );
};

{
  /* <Controller
control={control}
name="username"
render={({field: {value, onChange, onBlur}}) => (
  <TextInput
    placeholder="username"
    onChangeText={onChange}
    onBlur={onBlur}
    value={value}
  />
)}
/> */
}
