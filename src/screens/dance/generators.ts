import {StoryType} from '../../models/Story';

export const screenTitle = (
  currentStory: StoryType | null,
  chapterOrder: number,
) => {
  const storyTitle = currentStory?.title
    ? currentStory.title
    : 'Loading story name...';
  const chapterTitle = 'Chapter ' + chapterOrder;
  return `${storyTitle} // ${chapterTitle}`;
};
