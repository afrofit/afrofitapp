import * as React from 'react';
import {StoryType} from '../../../models/Story';
import {theme} from '../../../theme/theme';
import {calculatePercentageCompleted} from '../../../utils/calculators';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {StoryHeaderBackground} from './StoryScreenHeader.styles';

interface Props {
  currentStory: StoryType | null;
}

export const StoryScreenHeader: React.FC<Props> = ({currentStory}) => {
  const generateStatus = () => {
    if (currentStory) {
      if (currentStory.started && currentStory.completed) return 'Completed';
      else if (currentStory.started && !currentStory.completed) {
        calculatePercentageCompleted(
          currentStory.totalBodyMoves,
          currentStory.totalTargetBodyMoves,
        );
        return '% Completed';
      }
    }
    return 'Not started';
  };
  return (
    <StoryHeaderBackground>
      <BaseFont variant="title">
        {currentStory ? currentStory.title : 'Loading title...'}
      </BaseFont>
      <Spacer h={5} />
      <BaseFont variant="small-caps" color={theme.COLORS.yellow}>
        {generateStatus()}
      </BaseFont>
    </StoryHeaderBackground>
  );
};
