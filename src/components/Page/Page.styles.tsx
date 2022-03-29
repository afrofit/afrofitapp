import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  padding?: number;
  color?: string;
}

export const PageContainer = styled.View<Props>`
  flex: 1;
  z-index: 30;
  background-color: ${theme.COLORS.black};
  padding: ${props => (props.padding ? `${props.padding}px` : 0)};
  background-color: ${props => (props.color ? props.color : theme.COLORS.dark)};
`;

export const PageSafeAreaView = styled.SafeAreaView<Props>`
  flex: 1;
  z-index: 30;
  background-color: ${props => (props.color ? props.color : theme.COLORS.dark)};
`;

export const PageWrapper = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
`;
