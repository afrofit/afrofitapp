import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const StoryImageBackground = styled.View`
  min-height: 20px;
  width: 100%;
  margin-bottom: ${theme.MARGIN.lg};
  border-radius: ${theme.BORDER_RADIUS.sm};
  overflow: hidden;
  padding: 30px;
  align-items: flex-end;
  justify-content: space-between;
  background-color: ${theme.COLORS.black};
`;
