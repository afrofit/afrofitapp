import * as React from 'react';
import styled from 'styled-components/native';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {theme} from '../../../../theme/theme';

export const FilterContainer = styled.View`
  background-color: ${theme.COLORS.darker};
  margin-bottom: 20px;
  border-radius: ${theme.BORDER_RADIUS.sm};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FilterPressableElement = styled.Pressable`
  margin: 10px;
`;

interface Props {
  active: boolean;
  onPress: () => void;
  text: string;
}

export const FilterPressable: React.FC<Props> = ({
  active = false,
  onPress,
  text,
}) => {
  const color = active ? theme.COLORS.yellow : theme.COLORS.gray_200;

  return (
    <FilterPressableElement onPress={onPress}>
      <BaseFont color={color} variant="small-caps">
        {text}
      </BaseFont>
    </FilterPressableElement>
  );
};
