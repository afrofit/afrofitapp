import * as React from 'react';

import {UserStatsType} from '../../../game/types/activity.types';
import {StatsRect} from './ProfileStatsCard.styles';

interface Props {
  stats: UserStatsType;
}

export const ProfileStatsCard: React.FC<Props> = ({stats}) => {
  return stats ? (
    <>
      <StatsRect label="Calories Burned" value={stats.totalCaloriesBurned} />
      <StatsRect label="Body Movements" value={stats.totalBodyMoves} />
      <StatsRect
        label={stats.totalDaysActive < 2 ? 'Day Active' : 'Days Active'}
        value={stats.totalDaysActive}
      />
      <StatsRect
        label="Hours Danced"
        value={stats.totalTimeDancedInMilliseconds}
      />
    </>
  ) : null;
};
