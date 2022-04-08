import * as React from 'react';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {theme} from '../../../../theme/theme';
import {
  RankingsCardContainer,
  RankingsIdentifierGrouping,
  RankingsNumberBackground,
} from './RankingsCard.styles';

export const RankingsCard = ({
  username = 'Lee Rayner Mitch',
  currentUser = true,
  rankPosition = 5,
  bodyMoves = 567,
}) => {
  const rankingNumberColor = () => {
    if (currentUser) return theme.COLORS.black;
    return rankPosition == 1
      ? theme.COLORS.yellow
      : rankPosition == 2
      ? theme.COLORS.gray_500
      : rankPosition == 3
      ? theme.COLORS.bronze
      : theme.COLORS.gray_500;
  };

  return (
    <RankingsCardContainer currentUser={currentUser}>
      <RankingsIdentifierGrouping>
        <RankingsNumberBackground color={rankingNumberColor()}>
          <BaseFont variant="small-paragraph">{rankPosition}</BaseFont>
        </RankingsNumberBackground>
        <BaseFont color={currentUser ? theme.COLORS.black : theme.COLORS.white}>
          {currentUser ? 'You' : username}
        </BaseFont>
      </RankingsIdentifierGrouping>
      <BaseFont
        color={currentUser ? theme.COLORS.black : theme.COLORS.white}
        variant="small-bold-paragraph">
        {bodyMoves}
      </BaseFont>
    </RankingsCardContainer>
  );
};
