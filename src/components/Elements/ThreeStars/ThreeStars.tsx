import * as React from 'react';
import {ElementContainer, AssetElement} from './ThreeStars.styles';

interface Props {
  variant?: string;
  height?: number;
}

export const ThreeStars: React.FC<Props> = ({
  variant = 'yellow',
  height = 20,
}) => {
  return (
    <ElementContainer>
      {variant === 'yellow' ? (
        <AssetElement
          height={height}
          source={require('../../../assets/images/elements/three_stars_yellow.png')}
        />
      ) : (
        <AssetElement
          height={height}
          source={require('../../../assets/images/elements/three_stars_gray.png')}
        />
      )}
    </ElementContainer>
  );
};
