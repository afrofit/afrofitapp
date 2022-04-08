import * as React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {BaseButton} from '../../components/Buttons/BaseButton';
import {BaseFont} from '../../components/Font/BaseFont';
import {NotifyScreensHeader} from '../../components/Headers/NotifyScreensHeader/NotifyScreensHeader';
import Spacer from '../../components/Library/Spacer';
import {Page} from '../../components/Page/Page';
import {
  getCurrentUser,
  getCurrentUserToken,
  setCurrentUser,
} from '../../features/auth/user.slice';
import useDisableHardwareBack from '../../hooks/useDisableHardwareBack';
import {
  AnimationContainer,
  MiddleContainer,
  SignupSuccessButtonContainer,
} from './SignupSuccessScreen.styles';
import {User} from '../../models/User';
import AnimatedLottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme';

interface Props {}

export const VerifyCodeSuccessScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  let animationRef: AnimatedLottieView | null;

  const currentUserToken = useSelector(getCurrentUserToken);

  const {backDisabled} = useDisableHardwareBack();

  useFocusEffect(backDisabled());

  const handleFinaliseSignup = () => {
    if (currentUserToken) {
      const user: User = jwtDecode(currentUserToken);
      dispatch(setCurrentUser(user));
    }
  };

  React.useEffect(() => {
    animationRef && animationRef.play();
  }, []);

  return (
    <Page>
      <Spacer />
      <NotifyScreensHeader title="Account Created!" />
      <Spacer />
      <BaseFont variant="small-tagline" color={theme.COLORS.yellow}>
        You've got email!
      </BaseFont>
      <Spacer />
      <MiddleContainer>
        <AnimationContainer>
          <AnimatedLottieView
            ref={animation => (animationRef = animation)}
            loop={true}
            // onAnimationFinish={onAnimationDone}
            style={styles.animation}
            source={require('../../assets/animations/thumbs_up.json')}
          />
        </AnimationContainer>
        <BaseFont variant="bold-paragraph">
          We've sent a 6-digit verification code to your email. Tap continue
          when you've got it.
        </BaseFont>

        <SignupSuccessButtonContainer>
          <BaseButton
            onPress={handleFinaliseSignup}
            text="Continue"
            variant="white"
          />
        </SignupSuccessButtonContainer>
      </MiddleContainer>
    </Page>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 225,
  },
});
