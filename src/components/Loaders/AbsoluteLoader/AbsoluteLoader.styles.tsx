import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

const BOX_SIZE = '90px';

export const LottieWrapper = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${theme.COLORS.black};
  opacity: 0.95;
  position: absolute;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

export const LoaderContainer = styled.View`
  height: ${BOX_SIZE};
  width: ${BOX_SIZE};
  justify-content: center;
  align-items: center;
`;
