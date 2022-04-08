import * as React from 'react';
import {Button, Keyboard} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ClearButton} from '../../../components/Buttons/ClearButton';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {AuthScreensHeader} from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {PageImaged} from '../../../components/Page/PageImaged';
import {EMAIL_REGEX} from '../../../constants/regex';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {SubmitHandler, FieldValues, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../../features/auth/log-in-user-thunk';
import {
  getChangePasswordSuccess,
  getConfirmPasswordResetCodeSuccess,
  getEmailResetSuccess,
  getPasswordResetStage,
  getVerifySuccess,
  switchPasswordResetStages,
} from '../../../features/auth/user.slice';
import {EmailScreen} from './Screens/EmailScreen';
import {CodeScreen} from './Screens/CodeScreen';
import {NewPasswordScreen} from './Screens/NewPasswordScreen';
import {
  emailPasswordResetCode,
  emailPasswordResetCodeApi,
} from '../../../features/auth/reset-password/email-reset-code-thunks';

export type navigationType = StackNavigationProp<
  AuthStackParamList,
  | 'Login'
  | 'Signup'
  | 'SignupSuccess'
  | 'ForgotPassword'
  | 'ForgotPasswordSuccess'
  | 'Welcome'
>;

interface Props {}

export const ForgotPasswordScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  const dispatch = useDispatch();

  const currentStage = useSelector(getPasswordResetStage);

  const resetEmailStatus = useSelector(getEmailResetSuccess);
  const verifyEmailStatus = useSelector(getConfirmPasswordResetCodeSuccess);
  const changePasswordStatus = useSelector(getChangePasswordSuccess);

  const [email, setEmail] = React.useState<string | null>(null);

  /** */

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [newPassword, setNewPassword] = React.useState<FieldValues | null>(
    null,
  );

  React.useEffect(() => {
    if (changePasswordStatus) {
      navigation.navigate('ForgotPasswordSuccess');
    }
  }, [changePasswordStatus]);

  /** */

  React.useEffect(() => {
    console.log(resetEmailStatus, verifyEmailStatus);
    if (verifyEmailStatus && resetEmailStatus) {
      dispatch(switchPasswordResetStages('RESET'));
      return;
    }
    if (resetEmailStatus && !verifyEmailStatus) {
      dispatch(switchPasswordResetStages('VERIFY'));
      return;
    }
  }, [resetEmailStatus, verifyEmailStatus]);

  return (
    <PageImaged onPress={() => Keyboard.dismiss()}>
      <AuthScreensHeader title="Forgot Password" />

      {currentStage === 'REQUEST_LINK' && <EmailScreen setEmail={setEmail} />}
      {currentStage === 'VERIFY' && <CodeScreen email={email} />}
      {currentStage === 'RESET' && <NewPasswordScreen />}
      <ClearButton
        text="Sign in instead?"
        variant="yellow"
        onPress={() => navigation.navigate('Login')}
      />
    </PageImaged>
  );
};
