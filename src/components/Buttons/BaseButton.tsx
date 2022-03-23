import * as React from 'react';
import styled from 'styled-components/native';

import {theme} from '../../theme/theme';
import {BUTTON_VARIANTS} from './ButtonVariants';

interface StyledButtonProps {
  color: string;
}

export const SolidButton = styled.Pressable<StyledButtonProps>`
  overflow: hidden;
  border-radius: 50px;
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: ${theme.COLORS.bronze};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<StyledButtonProps>`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${props => (props.color ? props.color : theme.COLORS.black)};
`;

interface Props {
  onPress: () => void;
  variant?: string;
}

export const BaseButton: React.FC<Props> = ({variant = 'white', onPress}) => {
  const textColor = BUTTON_VARIANTS[variant].textColor;
  const buttonBackgroundColor = BUTTON_VARIANTS[variant].backgroundColor;

  return (
    <SolidButton color={buttonBackgroundColor} onPress={onPress}>
      <ButtonText color={textColor}>Something here</ButtonText>
    </SolidButton>
  );
};
