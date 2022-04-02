import * as React from 'react';

import {BaseFont} from '../../../../components/Font/BaseFont';
import {theme} from '../../../../theme/theme';
import {calculatePercentageCompleted} from '../../../../utils/calculators';

import {
  StoryCardBackground,
  StoryCardStatusTag,
  StoryCardTitleContainer,
  StoryCardTouchable,
} from './StoryCard.styles';

interface Props {
  storyTitle: string;
  completed: boolean;
  started: boolean;
  onPress: () => void;
  source: any;
  totalTargetBodyMoves: number;
  totalBodyMoves: number;
}

const StoryCard: React.FC<Props> = ({
  storyTitle,
  completed,
  started,
  onPress,
  source,
  totalTargetBodyMoves,
  totalBodyMoves,
}) => {
  const generateMessage = (): string => {
    if (started && completed) return 'Completed';
    else if (started && !completed)
      return `${calculatePercentageCompleted(
        totalBodyMoves,
        totalTargetBodyMoves,
      )}% completed`;
    else if (!started) return 'Fresh';
    else return 'Fresh';
  };
  return (
    <StoryCardTouchable onPress={onPress}>
      <StoryCardBackground source={{uri: source}}>
        <StoryCardStatusTag>
          <BaseFont variant="small-caps" color={theme.COLORS.gray_400}>
            {generateMessage()}
          </BaseFont>
        </StoryCardStatusTag>
        <StoryCardTitleContainer>
          <BaseFont variant="big-caps" color={theme.COLORS.yellow}>
            {storyTitle}
          </BaseFont>
        </StoryCardTitleContainer>
      </StoryCardBackground>
    </StoryCardTouchable>
  );
};

export default StoryCard;
