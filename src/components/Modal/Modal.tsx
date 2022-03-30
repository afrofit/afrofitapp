import * as React from 'react';

import Spacer from '../Library/Spacer';

import {CancelButton} from '../Buttons/CancelButton';
import {Squigly} from '../Elements/Squigly';
import {BaseFont} from '../Font/BaseFont';
import {BackgroundOverlay, ModalContainer} from './Modal.styles';
import {theme} from '../../theme/theme';

interface Props {
  title: string;
}

export const Modal: React.FC<Props> = ({children, title}) => {
  return (
    <>
      <BackgroundOverlay>
        <ModalContainer>
          <BaseFont variant="small-caps" color={theme.COLORS.gray_300}>
            {title}
          </BaseFont>
          <Squigly float top="20" />
          <Spacer h={40} />
          {children}
        </ModalContainer>
      </BackgroundOverlay>
    </>
  );
};
