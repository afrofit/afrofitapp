import * as React from 'react';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import Spacer from '../../../../components/Library/Spacer';
import {theme} from '../../../../theme/theme';
import {RankBadge} from '../RankBadge/RankBadge';
import {
  EmailText,
  JoinDateText,
  ProfileNameCardContainer,
  ProfileNameCardContent,
  ProfileNameCardTouchable,
  UsernameText,
} from './ProfileNameCard.styles';

interface Props {
  email: string;
  username: string;
  joinDate: number | string;
  onTapUsername: () => void;
  rankId: number;
}

const ProfileNameCard: React.FC<Props> = ({
  email,
  username,
  joinDate,
  onTapUsername,
  rankId,
}) => {
  const formatDate = () => {
    return new Date(joinDate);
  };

  return (
    <BaseCard color={theme.COLORS.darker} outline={true}>
      <ProfileNameCardContainer>
        <RankBadge size="60" rankCode={rankId} />
        <ProfileNameCardContent>
          <ProfileNameCardTouchable onPress={onTapUsername}>
            <UsernameText>{username}</UsernameText>
          </ProfileNameCardTouchable>
          <Spacer h={5} />
          <EmailText>{email}</EmailText>
          <Spacer h={20} />
          <JoinDateText>Joined {formatDate().toDateString()}</JoinDateText>
        </ProfileNameCardContent>
      </ProfileNameCardContainer>
    </BaseCard>
  );
};

export default ProfileNameCard;
