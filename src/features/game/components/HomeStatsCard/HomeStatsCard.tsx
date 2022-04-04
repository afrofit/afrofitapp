import * as React from 'react';

import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {Stats, StatsContainer} from './HomeStatsCard.styles';
import {theme} from '../../../../theme/theme';

interface Props {
  calBurned: number;
  bodyMovements: number;
}

const HomeStatsCard: React.FC<Props> = ({calBurned, bodyMovements}) => {
  return (
    <BaseCard>
      <BaseFont variant="small-caps" color={theme.COLORS.gray_500}>
        Your Activity Today
      </BaseFont>
      <Spacer h={10} />
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
            {bodyMovements}
          </BaseFont>
          <BaseFont variant="label" color={theme.COLORS.gray_300}>
            Body Moves
          </BaseFont>
        </Stats>
      </StatsContainer>
    </BaseCard>
  );
};

export default HomeStatsCard;
