import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const ErrorMessageContainer = styled.View`
  background-color: ${theme.COLORS.red};
  padding: 6px;
  margin-top: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 90%;
  top: 4%;
  z-index: 10;
  align-self: center;
  border-radius: ${theme.BORDER_RADIUS.sm};
`;
