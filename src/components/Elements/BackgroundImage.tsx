import * as React from 'react';
import styled from 'styled-components/native';
export type ImageSourceType = {
  [key: string]: number;
};
const imageSources: ImageSourceType = {
  maleModel: require('../../assets/images/art/frontpage_male_model_blurred.jpg'),
};

interface IImageBackground {
  opacity: number;
}

const Background = styled.ImageBackground<IImageBackground>`
  resize-mode: contain;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  opacity: ${props => (props.opacity ? props.opacity : 1)};
  flex: 1;
`;

export const BackgroundImage = ({imageType = 'maleModel', opacity = 1}) => {
  return <Background opacity={opacity} source={imageSources[imageType]} />;
};

// opacity: 0.8;
