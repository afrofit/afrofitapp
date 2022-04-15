import * as React from 'react';
import {BaseButton} from '../../Buttons/BaseButton';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {Modal} from '../Modal';

interface Props {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirm?: string;
  cancel?: string;
  content: string;
}

export const ConfirmModal: React.FC<Props> = ({
  title = 'Are you sure?',
  onCancel,
  onConfirm,
  confirm = 'Confirm',
  cancel = 'Cancel',
  content = 'Modal content goes here',
}) => {
  return (
    <Modal title={title}>
      <BaseFont variant="paragraph">{content}</BaseFont>
      <Spacer h={20} />
      <BaseButton text={confirm} onPress={onConfirm} />
      <BaseButton text={cancel} variant="red" onPress={onCancel} />
    </Modal>
  );
};
