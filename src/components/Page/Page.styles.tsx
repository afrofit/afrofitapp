import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  padding?: number;
}

export const PageContainer = styled.View<Props>`
  flex: 1;
  background-color: ${theme.COLORS.black};
  padding: ${props => (props.padding ? `${props.padding}px` : 0)};
`;

export const PageSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
