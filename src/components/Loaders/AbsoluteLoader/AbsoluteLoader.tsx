import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import {LoaderContainer, LottieWrapper} from './AbsoluteLoader.styles';
import {BaseFont} from '../../Font/BaseFont';
import {theme} from '../../../theme/theme';
import Spacer from '../../Library/Spacer';
import {StyleSheet} from 'react-native';

interface Props {
  message?: string;
  visible?: boolean;
}

export const AbsoluteLoader: React.FC<Props> = ({
  message = 'Loading Content',
  visible = true,
}) => {
  let animationRef: AnimatedLottieView | null;

  React.useEffect(() => {
    animationRef && animationRef.play();
  }, []);

  if (!visible) return null;
  return (
    <LottieWrapper>
      <LoaderContainer>
        <AnimatedLottieView
          ref={animation => (animationRef = animation)}
          autoPlay
          loop={true}
          source={require('../../../assets/animations/music_loader.json')}
          style={styles.animation}
        />
      </LoaderContainer>
      <Spacer />
      <BaseFont variant="small-caps" color={theme.COLORS.white}>
        {message} . . .
      </BaseFont>
    </LottieWrapper>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 80,
    marginBottom: 10,
  },
});
