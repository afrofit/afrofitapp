import * as React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {changeUsername} from '../../../features/auth/change-username-thunk';
import {getChangeUsernameSuccess} from '../../../features/auth/user.slice';
import {selectSubmitting} from '../../../features/ui/ui.slice';
import {BaseButton} from '../../Buttons/BaseButton';
import {CustomInput} from '../../Form/Inputs/CustomInput';
import {LocalLoader} from '../../Loaders/LocalLoader/LocalLoader';
import {LocalLNotifier} from '../../Notifiers/LocalNotifier';
import {Modal} from '../Modal';

interface Props {
  title?: string;
  onDismiss: () => void;
  buttonText?: string;
}

export const FormModal: React.FC<Props> = ({
  title = 'Modal Title!',
  onDismiss,
  buttonText = 'Trigger Action',
}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [formData, setFormData] = React.useState<FieldValues | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [showNotifier, setShowNotifier] = React.useState<boolean>(true);

  const isSubmitting = useSelector(selectSubmitting);
  const changeUsernameSuccessStatus = useSelector(getChangeUsernameSuccess);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const {username} = data;
    dispatch(changeUsername(username));
    onDismiss();
  };

  return (
    <Modal title={title}>
      {!isSubmitting && !isSubmitted && (
        <CustomInput
          name="username"
          placeholder="New username..."
          label="Username"
          control={control}
          rules={{required: true, minLength: 6, maxLength: 25}}
        />
      )}
      {isSubmitting && <LocalLoader />}
      <LocalLNotifier
        message="Username Changed!"
        visible={changeUsernameSuccessStatus}
      />
      <BaseButton
        text={buttonText}
        onPress={handleSubmit(onSubmit)}
        variant="red"
      />
      <BaseButton text={isSubmitting ? 'Cancel' : 'Done'} onPress={onDismiss} />
    </Modal>
  );
};
