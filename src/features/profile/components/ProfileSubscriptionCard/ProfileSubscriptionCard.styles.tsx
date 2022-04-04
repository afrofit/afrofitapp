import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

interface Props {
  color?: string;
}
export const LabelText = styled.Text<Props>`
  font-family: 'Medium';
  font-size: 12px;
  letter-spacing: 1px;
  color: ${props => (props.color ? theme.COLORS.white : theme.COLORS.white)};
  text-transform: lowercase;
`;

export const NumberText = styled.Text<Props>`
  font-family: 'NumberThin';
  font-size: 35px;
  letter-spacing: 3px;
  color: ${theme.COLORS.white};
`;

export const SubscriptionCardContainer = styled.View<Props>`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
