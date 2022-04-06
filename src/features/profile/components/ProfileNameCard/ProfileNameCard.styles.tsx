import styled from 'styled-components/native';
import {theme} from '../../../../theme/theme';

export const ProfileNameCardTouchable = styled.Pressable``;

export const ProfileNameCardContainer = styled.View`
  align-items: flex-end;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UsernameText = styled.Text`
  font-weight: 500;
  color: ${theme.COLORS.yellow};
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const EmailText = styled(UsernameText)`
  font-size: 13px;
  color: ${theme.COLORS.gray_400};
  text-transform: lowercase;
  letter-spacing: 0;
`;

export const JoinDateText = styled(UsernameText)`
  font-size: 10px;
  color: ${theme.COLORS.gray_500};
  letter-spacing: 0;
`;

export const ProfileNameCardMarginer = styled.View`
  flex: 1;
`;
