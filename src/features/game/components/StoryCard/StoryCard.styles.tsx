import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

export const StoryCardBackground = styled.ImageBackground`
  height: 150px;
  margin-bottom: ${theme.MARGIN.lg};
  border-radius: ${theme.BORDER_RADIUS.md};
  overflow: hidden;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
  align-items: flex-end;
  justify-content: space-between;
  resize-mode: contain;
`;

export const StoryCardStatusTag = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: ${theme.BORDER_RADIUS.sm};
  background-color: ${theme.COLORS.white};
`;

export const StoryCardTitleContainer = styled.View`
  background-color: ${theme.COLORS.black};
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const StoryCardTouchable = styled.Pressable`
  overflow: hidden;
`;
