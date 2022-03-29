import * as React from 'react';
import styled from 'styled-components/native';
import {AntDesign} from '@expo/vector-icons';
import {theme} from '../../theme/theme';

interface Props {
  onPress: () => void;
  color?: string;
}
const Touchable = styled.Pressable`
  position: absolute;
  left: 107.5%;
  top: 30%;
`;

export const CancelButton: React.FC<Props> = ({
  color = theme.COLORS.white,
  onPress,
}) => {
  return (
    <Touchable onPress={onPress}>
      <AntDesign name="closecircle" size={20} color={color} />
    </Touchable>
  );
};
