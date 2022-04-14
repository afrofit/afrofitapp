import * as React from 'react';

import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {ChapterType} from '../../../../models/Chapter';
import {theme} from '../../../../theme/theme';
import {ChapterSummaryModel} from '../../../../types/types';
import {ChapterCard} from '../ChapterCard/ChapterCard';
import {ChapterListContainer, ChapterListScroller} from './ChapterList.styles';

interface Props {
  triggerNavigate: (chapter: ChapterType) => void;
  chapters: ChapterType[] | [];
}

const ChapterListSection: React.FC<Props> = ({triggerNavigate, chapters}) => {
  const renderChapters = () => {
    return chapters.length ? (
      chapters.map((chapter, index) => {
        const chapterStatus = chapter.completed
          ? 'finished'
          : chapter.started && !chapter.completed
          ? 'ongoing'
          : 'unstarted';

        return (
          <ChapterCard
            key={chapter.contentChapterId}
            onPress={() => triggerNavigate(chapter)}
            status={chapterStatus}
            chapterNumber={index + 1}
          />
        );
      })
    ) : (
      <BaseFont variant="paragraph" color={theme.COLORS.gray_300}>
        There are currently no chapters available to play.
      </BaseFont>
    );
  };

  return (
    <>
      {chapters.length ? (
        <BaseFont variant="small-caps" color={theme.COLORS.gray_400}>
          Stories You can play
        </BaseFont>
      ) : null}
      <Spacer />
      <ChapterListContainer>
        <ChapterListScroller showsVerticalScrollIndicator={false}>
          {renderChapters()}
        </ChapterListScroller>
      </ChapterListContainer>
    </>
  );
};

export default ChapterListSection;
