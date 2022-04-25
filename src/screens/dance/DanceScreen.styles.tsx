import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  left?: boolean;
}

export const VideoStatsContainer = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const VideoStatusBackground = styled.View`
  min-height: 20px;
  background-color: ${theme.COLORS.dark};
  width: 100%;
  border-radius: ${theme.BORDER_RADIUS.lg};
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const TargetsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DanceStatsContainer = styled.View<Props>`
  /* width: 45%; */
  justify-content: center;
  align-items: ${props => (props.left ? 'flex-end' : 'flex-start')};
  /* background-color: red; */
`;
