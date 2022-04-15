import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

export const VideoStatusBackground = styled.View`
  min-height: 20px;
  background-color: ${theme.COLORS.red};
  width: 100%;
  border-radius: ${theme.BORDER_RADIUS.lg};
  padding: 20px;
`;

export const TargetsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
