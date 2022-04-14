import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

interface Props {
  color?: string;
  tagColor?: string;
}

export const ChapterCardPressable = styled.Pressable`
  /* height: 25px; */
  width: 100%;
  padding: 10px;
  border-radius: ${theme.BORDER_RADIUS.sm};
`;

export const ChapterCardTagBackground = styled.View<Props>`
  justify-content: center;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${props =>
    props.tagColor ? props.tagColor : theme.COLORS.gray_300};
  border-radius: ${theme.BORDER_RADIUS.sm};
`;

export const ChapterCardElement = styled.View<Props>`
  background-color: ${props => (props.color ? props.color : theme.COLORS.dark)};
  min-height: 45px;
  border-radius: ${theme.BORDER_RADIUS.sm};
  /* opacity: 0.75; */
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px;
`;
