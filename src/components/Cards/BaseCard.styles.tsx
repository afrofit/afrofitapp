import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  color?: string;
  mb?: number;
}

export const CardBackground = styled.View<Props>`
  width: 100%;
  min-height: 30px;
  background-color: ${props =>
    props.color ? props.color : theme.COLORS.darker};
  padding: 20px;
  border-radius: ${theme.BORDER_RADIUS.md};
  margin-bottom: ${props => (props.mb ? `${props.mb}px` : theme.MARGIN.lg)};
`;

export const CardBackgroundOutline = styled.View<Props>`
  width: 100%;
  min-height: 30px;
  padding: 20px;
  border-radius: ${theme.BORDER_RADIUS.md};
  margin-bottom: ${props => (props.mb ? `${props.mb}px` : theme.MARGIN.lg)};
  border-width: 1px;
  border-color: ${theme.COLORS.gray_400};
`;
