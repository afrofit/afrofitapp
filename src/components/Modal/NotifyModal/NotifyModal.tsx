import * as React from 'react';
import {BaseButton} from '../../Buttons/BaseButton';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {Modal} from '../Modal';

interface Props {
  title?: string;
  onDismiss: () => void;
  content: string;
  buttonText?: string;
}

export const NotifyModal: React.FC<Props> = ({
  title = 'Success!',
  onDismiss,
  content = 'Modal content goes here',
  buttonText = 'Continue',
}) => {
  return (
    <Modal title={title}>
      <BaseFont variant="paragraph">{content}</BaseFont>
      <Spacer h={20} />
      <BaseButton text={buttonText} onPress={onDismiss} />
    </Modal>
  );
};
