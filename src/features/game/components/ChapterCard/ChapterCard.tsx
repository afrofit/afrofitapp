import * as React from 'react';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {theme} from '../../../../theme/theme';
import {
  ChapterCardPressable,
  ChapterCardTagBackground,
  ChapterCardElement,
} from './ChapterCard.styles';

interface Props {
  status?: keyof typeof CardVariants;
}

const CardVariants = {
  finished: {
    textColor: theme.COLORS.black,
    bgColor: theme.COLORS.white,
    tagColor: theme.COLORS.black,
    statusText: 'Done',
  },
  ongoing: {
    textColor: theme.COLORS.black,
    bgColor: theme.COLORS.white,
    tagColor: theme.COLORS.black,
    statusText: 'Started',
  },
  unstarted: {
    textColor: theme.COLORS.white,
    bgColor: theme.COLORS.dark,
    tagColor: theme.COLORS.black,
    statusText: 'Fresh',
  },
};

export const ChapterCard: React.FC<Props> = ({status = 'finished'}) => {
  const textColor = CardVariants[status].textColor;
  const bgColor = CardVariants[status].bgColor;
  const tagColor = CardVariants[status].tagColor;

  const statusText = CardVariants[status].statusText;

  return (
    <ChapterCardPressable>
      <ChapterCardElement color={bgColor}>
        <BaseFont color={textColor} variant="paragraph">
          Chapter 1
        </BaseFont>
        <ChapterCardTagBackground>
          <BaseFont color={tagColor} variant="tag-tiny">
            {statusText}
          </BaseFont>
        </ChapterCardTagBackground>
      </ChapterCardElement>
    </ChapterCardPressable>
  );
};
