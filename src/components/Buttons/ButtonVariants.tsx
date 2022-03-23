import {theme} from '../../theme/theme';

interface IButtonProperties {
  backgroundColor: string;
  textColor: string;
}

interface IButtonVariants {
  [key: string]: IButtonProperties;
}

export const BUTTON_VARIANTS: IButtonVariants = {
  white: {
    backgroundColor: theme.COLORS.white,
    textColor: theme.COLORS.black,
  },
};
