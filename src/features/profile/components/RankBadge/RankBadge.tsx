import * as React from 'react';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {RANKS_DATA} from '../../../../data/rank-data';
import {theme} from '../../../../theme/theme';
import {
  RankBadgeContainer,
  RankColumnBadgeContainer,
  RankLogo,
  RankRowBadgeContainer,
} from './RankBadge.styles';

interface Props {
  size: number;
  rankCode: number;
  showLabel?: boolean;
  sideLabel?: boolean;
  margin?: number;
  currentUser?: boolean;
}

export const RankBadge: React.FC<Props> = ({
  size = 40,
  rankCode = 1,
  showLabel = true,
  sideLabel = false,
  margin = 10,
  currentUser = false,
}) => {
  return (
    <>
      {!showLabel && !sideLabel && (
        <RankBadgeContainer margin={margin}>
          <RankLogo
            size={currentUser ? size + 15 : size}
            source={RANKS_DATA[rankCode].src}
          />
        </RankBadgeContainer>
      )}
      {showLabel && !sideLabel && (
        <>
          <RankColumnBadgeContainer margin={margin}>
            <RankLogo
              size={currentUser ? size + 15 : size}
              source={RANKS_DATA[rankCode].src}
            />
            <Spacer h={10} />
            <BaseFont variant="small-paragraph" color={theme.COLORS.white}>
              {RANKS_DATA[rankCode].name}
            </BaseFont>
          </RankColumnBadgeContainer>
        </>
      )}
      {showLabel && sideLabel && (
        <>
          <RankRowBadgeContainer margin={margin}>
            <RankLogo
              size={currentUser ? size + 15 : size}
              source={RANKS_DATA[rankCode].src}
              mr={10}
            />
            <Spacer h={10} />
            <BaseFont variant="small-paragraph" color={theme.COLORS.white}>
              {RANKS_DATA[rankCode].name}
            </BaseFont>
          </RankRowBadgeContainer>
        </>
      )}
    </>
  );
};
