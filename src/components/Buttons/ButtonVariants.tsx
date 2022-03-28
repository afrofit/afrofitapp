import {theme} from '../../theme/theme';

export type ButtonVariantType = 'white' | 'red';

type ButtonPropertiesType = {
  backgroundColor: string;
  textColor: string;
};

type IButtonVariants = {
  [key in ButtonVariantType]: ButtonPropertiesType;
};

export const BUTTON_VARIANTS: IButtonVariants = {
  white: {
    backgroundColor: theme.COLORS.white,
    textColor: theme.COLORS.black,
  },
  red: {
    backgroundColor: theme.COLORS.red,
    textColor: theme.COLORS.white,
  },
};
