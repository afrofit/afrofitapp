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
  onPress: () => void;
  chapterNumber: number;
}

const CardVariants = {
  unstarted: {
    textColor: theme.COLORS.black,
    bgColor: theme.COLORS.gray_300,
    tagColor: theme.COLORS.white,
    tagBgColor: theme.COLORS.red,
    statusText: 'Fresh',
  },
  ongoing: {
    textColor: theme.COLORS.white,
    bgColor: theme.COLORS.bronze,
    tagColor: theme.COLORS.white,
    tagBgColor: theme.COLORS.black,
    statusText: 'Started',
  },
  finished: {
    textColor: theme.COLORS.gray_300,
    bgColor: theme.COLORS.gray_500,
    tagColor: theme.COLORS.gray_400,
    tagBgColor: theme.COLORS.darker,
    statusText: 'Done',
  },
};

export const ChapterCard: React.FC<Props> = ({
  status = 'unstarted',
  onPress,
  chapterNumber,
}) => {
  const textColor = CardVariants[status].textColor;
  const bgColor = CardVariants[status].bgColor;
  const tagColor = CardVariants[status].tagColor;
  const tagBgColor = CardVariants[status].tagBgColor;

  const statusText = CardVariants[status].statusText;

  return (
    <ChapterCardPressable onPress={onPress}>
      <ChapterCardElement color={bgColor}>
        <BaseFont color={textColor} variant="small-bold-paragraph">
          Chapter {chapterNumber}
        </BaseFont>
        <ChapterCardTagBackground color={tagBgColor}>
          <BaseFont color={tagColor} variant="tag-tiny">
            {statusText}
          </BaseFont>
        </ChapterCardTagBackground>
      </ChapterCardElement>
    </ChapterCardPressable>
  );
};
