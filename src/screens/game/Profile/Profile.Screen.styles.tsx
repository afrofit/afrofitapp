import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

export const ProfileScreenScroller = styled.ScrollView`
  max-height: 100%;
  width: 100%;
  border-radius: ${theme.BORDER_RADIUS.md};
`;

export const ProfileScreenContainer = styled.View`
  flex: 1;
`;
