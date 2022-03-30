import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const ErrorMessageContainer = styled.View`
  background-color: ${theme.COLORS.red};
  padding: 6px;
  margin-top: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  top: 4%;
  z-index: 10;
`;
