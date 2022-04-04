import * as React from 'react';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {theme} from '../../../../theme/theme';
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
      <StatsLine>
        <StatsBox>
          <BaseFont variant="number-large">{calBurned}</BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_400}>
            Calories Burned
          </BaseFont>
        </StatsBox>
        <StatsBox>
          <BaseFont variant="number-large">{hoursDanced}</BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_400}>
            Hours Danced
          </BaseFont>
        </StatsBox>
      </StatsLine>
      <Spacer />
      <StatsLine>
        <StatsBox>
          <BaseFont variant="number-large">{bodyMoves}</BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_400}>
            Body Moves
          </BaseFont>
        </StatsBox>
        <StatsBox>
          <BaseFont variant="number-large">{daysActive}</BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_400}>
            {daysActive < 2 ? 'Day Active' : 'Days Active'}
          </BaseFont>
        </StatsBox>
      </StatsLine>
    </BaseCard>
  );
};
