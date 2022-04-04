import * as React from 'react';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {RANKS_DATA} from '../../../../data/rank-data';
import {theme} from '../../../../theme/theme';
import {RankBadgeContainer, RankLogo} from './RankBadge.styles';

export const RankBadge = ({
  size = '40',
  rankCode = 1,
  showLabel = true,
  margin = 10,
  currentUser = false,
}) => {
  return (
    <RankBadgeContainer margin={margin}>
      <RankLogo
        size={currentUser ? +size + 15 : +size}
        source={RANKS_DATA[rankCode].src}
      />
      {showLabel && (
        <>
          <Spacer h={10} />
          <BaseFont variant="small-paragraph" color={theme.COLORS.white}>
            {RANKS_DATA[rankCode].name}
          </BaseFont>
        </>
      )}
    </RankBadgeContainer>
  );
};
