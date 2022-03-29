import * as React from 'react';

import Spacer from '../Library/Spacer';

import {CancelButton} from '../Buttons/CancelButton';
import {Squigly} from '../Elements/Squigly';
import {BaseFont} from '../Font/BaseFont';
import {BackgroundOverlay, ModalContainer} from './Modal.styles';

interface Props {}

export const Modal: React.FC<Props> = ({children}) => {
  return (
    <>
      <BackgroundOverlay>
        <ModalContainer>
          <CancelButton onPress={() => console.log('Cancel Pressed.')} />
          <BaseFont variant="small-caps">Modal Title</BaseFont>
          <Squigly float top="20" />
          <Spacer h={30} />
          <BaseFont variant="paragraph">Modal Title</BaseFont>
          {children}
        </ModalContainer>
      </BackgroundOverlay>
    </>
  );
};
