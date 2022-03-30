import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import {LoaderContainer, LottieWrapper} from './AbsoluteLoader.styles';
import {BaseFont} from '../../Font/BaseFont';
import {theme} from '../../../theme/theme';
import Spacer from '../../Library/Spacer';

export const AbsoluteLoader = ({
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
          source={require('../assets/animations/music_loader.json')}
        />
      </LoaderContainer>
      <Spacer />
      <BaseFont variant="paragraph" color={theme.COLORS.white}>
        {message}
      </BaseFont>
    </LottieWrapper>
  );
};
