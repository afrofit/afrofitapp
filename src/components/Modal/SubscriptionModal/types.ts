import {ButtonVariantType} from '../../Buttons/ButtonVariants';

export type PackageTypeString = 'MONTHLY' | 'SIX_MONTH' | 'ANNUAL';

export type PackageTypeReturnString =
  | 'monthly'
  | 'half-yearly'
  | 'yearly'
  | 'trial';

export type ButtonColorOptionsType = {
  [key: number]: ButtonVariantType;
};

export const ButtonColorOptions: ButtonColorOptionsType = {
  1: 'gray',
  2: 'white',
  3: 'bronze',
  4: 'red',
};
