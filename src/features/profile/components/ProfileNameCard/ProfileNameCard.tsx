import * as React from 'react';
import {ClearButton} from '../../../../components/Buttons/ClearButton';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {theme} from '../../../../theme/theme';
import {formatDate} from '../../util/formatters';
import {RankBadge} from '../RankBadge/RankBadge';

interface Props {
  email: string;
  username: string;
  joinDate: number | string;
  onChangeUsername: () => void;
  rankId: number;
}

const ProfileNameCard: React.FC<Props> = ({
  email,
  username,
  joinDate,
  onChangeUsername,
  rankId,
}) => {
  return (
    <>
      <BaseCard color={theme.COLORS.darker}>
        <RankBadge sideLabel={false} size={110} rankCode={rankId} />
        <Spacer h={25} />
        <BaseFont>{username}</BaseFont>
        <Spacer h={5} />
        <BaseFont variant="small-paragraph" color={theme.COLORS.gray_300}>
          {email}
        </BaseFont>
        <Spacer h={25} />
        <BaseFont variant="small-paragraph" color={theme.COLORS.gray_400}>
          joined {formatDate(joinDate).toDateString()}
        </BaseFont>
      </BaseCard>
      <ClearButton
        variant="yellow"
        text="Change your username"
        onPress={onChangeUsername}
      />
    </>
  );
};

export default ProfileNameCard;
