import * as React from 'react';
import {theme} from '../../../theme/theme';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {StoryImageBackground} from './StoryScreenHeader.styles';

export const StoryScreenHeader = () => {
  return (
    <StoryImageBackground>
      <BaseFont variant="title">AJ's Big Fight</BaseFont>
      <Spacer h={5} />
      <BaseFont variant="small-caps" color={theme.COLORS.gray_500}>
        30% complete
      </BaseFont>
    </StoryImageBackground>
  );
};
