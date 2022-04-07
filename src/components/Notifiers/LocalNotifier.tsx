import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme';
import {BaseFont} from '../Font/BaseFont';
import Spacer from '../Library/Spacer';
import {NotifierContainer} from './LocalNotifier.styles';

interface Props {
  message?: string;
  visible?: boolean;
}

export const LocalLNotifier: React.FC<Props> = ({
  message = 'Working',
  visible = true,
}) => {
  let animationRef: AnimatedLottieView | null;

  React.useEffect(() => {
    animationRef && animationRef.play();
  }, []);

  if (!visible) return null;
  return (
    <>
      <NotifierContainer>
        <AnimatedLottieView
          ref={animation => (animationRef = animation)}
          autoPlay
          loop={true}
          source={require('../../assets/animations/success.json')}
          style={styles.animation}
          //   onAnimationFinish={onDismiss}
        />
        <BaseFont variant="small-caps" color={theme.COLORS.white}>
          {message}
        </BaseFont>
      </NotifierContainer>
      <Spacer />
    </>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 50,
    marginRight: 10,
  },
});
