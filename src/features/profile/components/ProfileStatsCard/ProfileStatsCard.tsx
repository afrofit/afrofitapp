import * as React from 'react';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {theme} from '../../../../theme/theme';
import {
  StatsContainer,
  Stats,
} from '../../../game/components/HomeStatsCard/HomeStatsCard.styles';
import {StatsBox, StatsLine} from './ProfileStatsCard.styles';

interface Props {
  calBurned: string;
  bodyMoves: string;
  hoursDanced: number;
  daysActive: number;
}

export const ProfileStatsCard: React.FC<Props> = ({
  calBurned,
  bodyMoves,
  hoursDanced,
  daysActive,
}) => {
  return (
    <BaseCard>
      <BaseFont variant="small-caps" color={theme.COLORS.yellow}>
        Your Statistics
      </BaseFont>
      <Spacer />
      <StatsContainer>
        <Stats>
          <BaseFont variant="number-large" color={theme.COLORS.yellow}>
            {calBurned}
          </BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_300}>
            Cals Burned
          </BaseFont>
        </Stats>
        <Stats>
          <BaseFont variant="number-large" color={theme.COLORS.yellow}>
            {bodyMoves}
          </BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_300}>
            Body Moves
          </BaseFont>
        </Stats>
      </StatsContainer>
      <Spacer />

      <StatsContainer>
        <Stats>
          <BaseFont variant="number-large" color={theme.COLORS.yellow}>
            {daysActive}
          </BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_300}>
            {daysActive < 2 ? 'Day Active' : 'Days Active'}
          </BaseFont>
        </Stats>
        <Stats>
          <BaseFont variant="number-large" color={theme.COLORS.yellow}>
            {hoursDanced}
          </BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_300}>
            Hours Danced
          </BaseFont>
        </Stats>
      </StatsContainer>
    </BaseCard>
  );
};
