import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import {LoaderContainer} from './LocalLoader.styles';
import {BaseFont} from '../../Font/BaseFont';
import {theme} from '../../../theme/theme';
import Spacer from '../../Library/Spacer';
import {StyleSheet} from 'react-native';

interface Props {
  message?: string;
  visible?: boolean;
}

export const LocalLoader: React.FC<Props> = ({
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
      <LoaderContainer>
        <AnimatedLottieView
          ref={animation => (animationRef = animation)}
          autoPlay
          loop={true}
          source={require('../../../assets/animations/music_loader.json')}
          style={styles.animation}
        />
        <BaseFont variant="small-caps" color={theme.COLORS.white}>
          {message} . . .
        </BaseFont>
      </LoaderContainer>
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
