import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';

import {theme} from '../../../theme/theme';
import {Field, Input, LabelText} from './CustomInput.styles';

interface Props {
  name: string;
  placeholder: string;
  label: string;
  mode?: 'password' | 'regular' | 'numeric' | 'email';
  control: any;
}

type KeyboardTypes = 'email-address' | 'default';

export const CustomInput: React.FC<Props> = ({
  name,
  placeholder,
  label,
  mode = 'regular',
  control,
}) => {
  const keyboardType: KeyboardTypes =
    mode === 'email' ? 'email-address' : 'default';

  return (
    <Field error={false}>
      <Controller
        control={control}
        name={name}
        rules={{required: true}}
        render={({field: {value, onChange, onBlur}}) => (
          <React.Fragment>
            <LabelText error={false}>{label}</LabelText>
            <Input
              autoCapitalize="none"
              placeholder={placeholder}
              placeholderTextColor={theme.COLORS.gray_400}
              secureTextEntry={mode === 'password'}
              keyboardType={keyboardType}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          </React.Fragment>
        )}
      />
    </Field>
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
