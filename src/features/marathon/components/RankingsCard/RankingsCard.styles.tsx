import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

interface Props {
  currentUser?: boolean;
  color?: string;
  fontColor?: number;
}

export const RankingsCardContainer = styled.View<Props>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: ${theme.BORDER_RADIUS.sm};
  border-width: 1px;
  border-color: ${props =>
    props.currentUser ? 'none' : theme.COLORS.gray_400};
  background-color: ${props =>
    props.currentUser ? theme.COLORS.yellow : theme.COLORS.dark};
  margin-bottom: 10px;
`;

export const RankingsNumberBackground = styled.View<Props>`
  width: 35px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  border-radius: ${theme.BORDER_RADIUS.md};
  margin-right: 20px;
`;

export const RankingsIdentifierGrouping = styled.View<Props>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
