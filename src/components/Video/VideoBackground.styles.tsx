import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

export const VideoContainer = styled.View`
  align-items: center;
  height: ${theme.DEVICE_DIMENSIONS.height};
  width: ${theme.DEVICE_DIMENSIONS.width};
  position: absolute;
  z-index: -2;
  left: 0;
  top: 0;
`;

export const BackgroundVideoStyles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
  },
});

export const VideoContentContainer = styled.View`
  padding: 20px;
  background-color: none;
`;
