import * as React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {}

export const BackgroundOverlay = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 120;
`;

const ModalContainerElement = styled.View`
  resize-mode: contain;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  width: 90%;
  border-radius: ${theme.BORDER_RADIUS.md};
  overflow: hidden;
  padding: 30px;
  background-color: ${theme.COLORS.dark};
`;

export const ModalContainer: React.FC<Props> = ({children}) => {
  const imageSource = require('../../assets/images/art/model_male_01.png');
  return <ModalContainerElement>{children}</ModalContainerElement>;
};
