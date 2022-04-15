import * as React from 'react';
import {OneStarElementContainer, OneStarAssetElement} from './OneStar.styles';

interface Props {
  variant?: string;
  height?: number;
}

export const OneStar: React.FC<Props> = ({variant = 'yellow', height = 20}) => {
  return (
    <OneStarElementContainer>
      {variant === 'yellow' ? (
        <OneStarAssetElement
          height={height}
          source={require('../../../assets/images/elements/x_yellow.png')}
        />
      ) : (
        <OneStarAssetElement
          height={height}
          source={require('../../../assets/images/elements/x_gray.png')}
        />
      )}
    </OneStarElementContainer>
  );
};
