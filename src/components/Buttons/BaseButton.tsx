import * as React from 'react';

import {ButtonText, SolidButton} from './Button.styles';
import {ButtonVariantType, BUTTON_VARIANTS} from './ButtonVariants';

interface Props {
  onPress: (data?: any) => void;
  variant?: ButtonVariantType;
  text: string;
}

export const BaseButton: React.FC<Props> = ({
  variant = 'white',
  onPress,
  text,
}) => {
  const textColor = BUTTON_VARIANTS[variant].textColor;
  const buttonBackgroundColor = BUTTON_VARIANTS[variant].backgroundColor;

  return (
    <SolidButton color={buttonBackgroundColor} onPress={onPress}>
      <ButtonText color={textColor}>{text}</ButtonText>
    </SolidButton>
  );
};
