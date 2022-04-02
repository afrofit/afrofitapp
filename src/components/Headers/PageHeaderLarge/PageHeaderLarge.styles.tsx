import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const HeaderTitleText = styled.Text`
  font-size: 30px;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: capitalize;
  color: ${theme.COLORS.white};
`;

export const HeaderContainer = styled.View`
  height: 7%;
  width: 100%;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
