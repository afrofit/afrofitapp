import * as React from 'react';
import {Keyboard} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {VerifyStackParamList} from '../../../navigator/VerifyUserNavigator';
import {PageImaged} from '../../../components/Page/PageImaged';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {AuthScreensHeader} from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {ClearButton} from '../../../components/Buttons/ClearButton';
import {verifyUserThunk} from '../../../features/auth/verify-user-thunk';
import {NotifyModal} from '../../../components/Modal/NotifyModal/NotifyModal';
import {
  getCurrentUserToken,
  getResendVerifyCodeSuccess,
  getVerifySuccess,
  setCurrentUserToken,
} from '../../../features/auth/user.slice';
import {resendUserVerificationCode} from '../../../features/auth/resend-verify-code-thunk';

type navigationType = StackNavigationProp<
  VerifyStackParamList,
  'Verify' | 'VerifySuccess'
>;

interface Props {}

export const VerifyCodeScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  const dispatch = useDispatch();

  const verifyStatus = useSelector(getVerifySuccess);
  const resendVerifyCodeStatus = useSelector(getResendVerifyCodeSuccess);
  const currentUserToken = useSelector(getCurrentUserToken);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showResendModal, setShowResendModal] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    Keyboard.dismiss();
    dispatch(verifyUserThunk(data));
  };

  const handleTapContinue = React.useCallback(() => {
    return currentUserToken && dispatch(setCurrentUserToken(currentUserToken));
  }, [currentUserToken]);

  React.useEffect(() => {
    if (verifyStatus) {
      setShowModal(true);
    }
  }, [verifyStatus]);

  React.useEffect(() => {
    if (resendVerifyCodeStatus) {
      setShowResendModal(true);
    }
  }, [resendVerifyCodeStatus]);

  const handleResendCode = () => {
    return dispatch(resendUserVerificationCode());
  };

  return (
    <React.Fragment>
      {showModal && (
        <NotifyModal
          title="You're verified!"
          content="It's time to find your rhythm and fitness!"
          onDismiss={handleTapContinue}
        />
      )}
      {showResendModal && (
        <NotifyModal
          title="Done!"
          content="The code has been resent to your email!"
          onDismiss={() => setShowResendModal(false)}
        />
      )}
      <PageImaged onPress={() => Keyboard.dismiss()}>
        <AuthScreensHeader title="Verify Code" />
        <CustomInput
          name="code"
          placeholder="Enter 6-digit code..."
          label="Code"
          control={control}
          rules={{
            required: true,
            minLength: 6,
            maxLength: 6,
            min: 100000,
            max: 999999,
          }}
          mode="numeric"
          maxLength={6}
        />
        <ClearButton
          text="Resend Code?"
          variant="yellow"
          onPress={handleResendCode}
        />
        <BaseButton text="Verify Code" onPress={handleSubmit(onSubmit)} />
      </PageImaged>
    </React.Fragment>
  );
};
