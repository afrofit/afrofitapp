import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const TitleText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${theme.COLORS.white};
  text-align: center;
  line-height: 18px;
`;

export const HeaderContainer = styled.View`
  min-height: 7%;
  width: 100%;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
