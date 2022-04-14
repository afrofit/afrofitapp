export type StorySummaryModel = {
  contentStoryId: string;
  introVideo: string;
  instruction: string;
  completed: boolean;
  started: boolean;
  title: string;
};

export type ChapterSummaryModel = {
  contentStoryId: string;
  completed: boolean;
  started: boolean;
  title: string;
};
