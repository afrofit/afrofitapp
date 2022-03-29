import * as React from 'react';
import {theme} from '../../theme/theme';
import {ClearButtonText, Touchable} from './Button.styles';

type ClearButtonTypes = 'white' | 'gray' | 'yellow';

type VariantTypes = {
  [key in ClearButtonTypes]: string;
};
const variants: VariantTypes = {
  white: theme.COLORS.white,
  gray: theme.COLORS.gray_300,
  yellow: theme.COLORS.yellow,
};

interface Props {
  text: string;
  variant: ClearButtonTypes;
  onPress: () => void;
}

export const ClearButton: React.FC<Props> = ({
  text = 'Clear Button',
  variant = 'white',
  onPress,
}) => {
  const textColor = variants[variant];
  return (
    <Touchable onPress={onPress}>
      <ClearButtonText color={textColor}>{text}</ClearButtonText>
    </Touchable>
  );
};

export default ClearButton;
