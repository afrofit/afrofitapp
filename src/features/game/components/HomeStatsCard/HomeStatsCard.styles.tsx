import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

export const LabelText = styled.Text`
  font-family: 'Medium';
  font-size: 12px;
  letter-spacing: 0.5px;
  color: ${theme.COLORS.gray_500};
  width: 40%;
  text-transform: lowercase;
`;

export const NumberText = styled.Text`
  font-family: 'NumberThin';
  font-size: 50px;
  letter-spacing: 3px;
  color: ${theme.COLORS.yellow};
  margin-right: 5px;
`;

export const Stats = styled.View`
  width: 49.5%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StatsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
