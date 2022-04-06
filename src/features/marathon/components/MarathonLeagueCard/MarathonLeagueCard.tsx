import * as React from 'react';

import {BaseCard} from '../../../../components/Cards/BaseCard';
import {ThreeStars} from '../../../../components/Elements/ThreeStars/ThreeStars';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {RANKS_DATA} from '../../../../data/rank-data';
import {theme} from '../../../../theme/theme';
import {RankBadge} from '../../../profile/components/RankBadge/RankBadge';
import {HorizontalScroller} from './MarathonLeagueCard.styles';

interface Props {
  visibleRank?: number;
}

export const MarathonLeagueCard: React.FC<Props> = ({visibleRank = 1}) => {
  return (
    <BaseCard color={theme.COLORS.darker}>
      <HorizontalScroller horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(RANKS_DATA).map(badgeId => {
          return (
            <RankBadge
              key={+badgeId}
              showLabel={false}
              size={50}
              currentUser={RANKS_DATA[+badgeId].id === visibleRank}
              rankCode={+badgeId}
            />
          );
        })}
      </HorizontalScroller>
      <Spacer h={5} />
      <BaseFont variant="paragraph" color={theme.COLORS.white}>
        {RANKS_DATA[visibleRank].name} Trainer League
      </BaseFont>

      <Spacer h={20} />
      <ThreeStars variant="yellow" />
    </BaseCard>
  );
};
