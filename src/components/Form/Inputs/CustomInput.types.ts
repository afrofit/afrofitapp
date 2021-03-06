import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

export interface ICustomImputProps {
  name: string;
  placeholder: string;
  label: string;
  mode?: 'password' | 'regular' | 'numeric' | 'email';
  control: any;
  rules: any;
  maxLength?: number;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
}

export interface ErrorType {
  message?: string;
  ref?: {[key: string]: string};
  type?: 'minLength' | 'maxLength' | 'min' | 'max' | 'required';
}

export type IFormInput = {
  username: string;
  email: string;
  password: string;
};

export type KeyboardTypes = 'email-address' | 'default' | 'numeric';
