import * as React from 'react';
import {AntDesign} from '@expo/vector-icons';

import {Touchable} from './Button.styles';
import {theme} from '../../theme/theme';

interface Props {
  color?: string;
  onPress: () => void;
  iconType?: 'closecircle' | 'play' | 'pause';
}

export const IconButton: React.FC<Props> = ({
  color = theme.COLORS.white,
  onPress,
  iconType = 'closecircle',
}) => {
  return (
    <Touchable onPress={onPress}>
      <AntDesign name={iconType} size={50} color={color} />
    </Touchable>
  );
};
