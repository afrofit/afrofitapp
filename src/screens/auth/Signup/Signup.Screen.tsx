import * as React from 'react';

import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {AuthScreensHeader} from '../../../components/Headers/AuthScreenHeader/AuthScreenHeader';
import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {ClearButton} from '../../../components/Buttons/ClearButton';
import {ConfirmModal} from '../../../components/Modal/ConfirmModal/ConfirmModal';
import {CustomInput} from '../../../components/Form/Inputs/CustomInput';
import {EMAIL_REGEX} from '../../../constants/regex';
import {PageImaged} from '../../../components/Page/PageImaged';
import {createAccountThunk} from '../../../features/auth/create-account-thunk';
import {getSignupSuccess} from '../../../features/auth/user.slice';

type navigationType = StackNavigationProp<
  AuthStackParamList,
  'Login' | 'SignupSuccess'
>;
interface Props {}

export const SignupScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<navigationType>();
  const dispatch = useDispatch();

  const signupStatus = useSelector(getSignupSuccess);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FieldValues | null>(null);

  React.useEffect(() => {
    if (signupStatus) {
      navigation.navigate('SignupSuccess');
    }
  }, [signupStatus]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setShowModal(true);
    setFormData(data);
  };

  const handleFormSubmit = async () => {
    if (formData) {
      Keyboard.dismiss();
      dispatch(createAccountThunk(formData));
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <ConfirmModal
          title="Are you sure?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleFormSubmit}
          confirm="Yes, Continue!"
          cancel="I'm not sure"
          content="This means you agree to the Afrofit Terms of Service, Membership Terms and Privacy Policy."
        />
      ) : null}

      <PageImaged onPress={() => Keyboard.dismiss()}>
        <AuthScreensHeader title="Sign Up" />
        <CustomInput
          name="username"
          placeholder="Enter unique username..."
          label="Username"
          control={control}
          rules={{required: true, minLength: 6, maxLength: 25}}
        />
        <CustomInput
          name="email"
          placeholder="Your email..."
          label="Email"
          control={control}
          rules={{required: true, pattern: EMAIL_REGEX}}
        />
        <CustomInput
          name="password"
          placeholder="Your password..."
          label="Password"
          mode="password"
          control={control}
          rules={{required: true}}
        />

        <BaseButton text="Create Account" onPress={handleSubmit(onSubmit)} />
        <ClearButton
          text="Already have an account?"
          variant="gray"
          onPress={() => navigation.navigate('Login')}
        />
      </PageImaged>
    </>
  );
};
