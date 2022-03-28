import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface StyledButtonProps {
  color: string;
}

export const ButtonText = styled.Text<StyledButtonProps>`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${props => (props.color ? props.color : theme.COLORS.black)};
`;

export const SolidButton = styled.Pressable<StyledButtonProps>`
  overflow: hidden;
  border-radius: 50px;
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: ${props =>
    props.color ? props.color : theme.COLORS.black};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 20px;
`;
