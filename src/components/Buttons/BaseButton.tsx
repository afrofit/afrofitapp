import * as React from 'react';
import {theme} from '../../theme/theme';

import {ButtonText, SolidButton, SolidDisabledButton} from './Button.styles';
import {ButtonVariantType, BUTTON_VARIANTS} from './ButtonVariants';

interface Props {
  onPress: any;
  variant?: ButtonVariantType;
  text: string;
  disabled?: boolean;
}

export const BaseButton: React.FC<Props> = ({
  variant = 'white',
  onPress,
  text,
  disabled,
}) => {
  const textColor = BUTTON_VARIANTS[variant].textColor;
  const buttonBackgroundColor = BUTTON_VARIANTS[variant].backgroundColor;

  if (disabled)
    return (
      <SolidDisabledButton
        disabled
        color={buttonBackgroundColor}
        onPress={() => console.log('Disabled')}>
        <ButtonText color={theme.COLORS.gray_500}>{text}</ButtonText>
      </SolidDisabledButton>
    );

  return (
    <SolidButton color={buttonBackgroundColor} onPress={onPress}>
      <ButtonText color={textColor}>{text}</ButtonText>
    </SolidButton>
  );
};
