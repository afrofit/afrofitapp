import * as React from 'react';

import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {StoryType} from '../../../../models/Story';
import {theme} from '../../../../theme/theme';
import StoryCard from '../StoryCard/StoryCard';
import {StoryListContainer, StoryListScroller} from './StoryList.styles';

interface Props {
  triggerNavigate: (contentStoryId: string) => void;
  stories: StoryType[] | [];
}

const StoryListSection: React.FC<Props> = ({triggerNavigate, stories}) => {
  const renderStories = () => {
    return stories.length ? (
      stories.map(story => {
        return (
          <StoryCard
            key={story.contentStoryId}
            source={story.thumb}
            storyTitle={story.title}
            onPress={() => triggerNavigate(story.contentStoryId)}
            completed={story.completed}
            started={story.started}
            totalTargetBodyMoves={story.totalTargetBodyMoves}
            totalBodyMoves={story.totalBodyMoves}
          />
        );
      })
    ) : (
      <BaseFont variant="paragraph" color={theme.COLORS.gray_300}>
        There are currently no stories available to play.
      </BaseFont>
    );
  };

  return (
    <>
      {stories.length ? (
        <BaseFont variant="small-caps" color={theme.COLORS.gray_400}>
          Stories You can play
        </BaseFont>
      ) : null}
      <Spacer />
      <StoryListContainer>
        <StoryListScroller showsVerticalScrollIndicator={false}>
          {renderStories()}
        </StoryListScroller>
      </StoryListContainer>
    </>
  );
};

export default StoryListSection;
