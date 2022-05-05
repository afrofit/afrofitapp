import {ChapterType} from '../../models/Chapter';

export type GameStatusType = 'started' | 'paused' | 'completed';

export type GameFinishType =
  | 'story_completed'
  | 'success'
  | 'failed'
  | 'interrupted';

export type GameSaveType = 'time_finished' | 'moves_finished' | 'user_quit';

export type ParamsType = {
  params: ChapterType;
};

export type ResultsScreenType = {
  type: 'success' | 'fail';
  targetTimeInMillis: number;
  timeDancedInMillis: number;
  targetBodyMoves: number;
  bodyMoves: number;
  videoUrl: string;
  failVideo?: string;
};

type RouteParamsType = {
  bodyMoves: number;
  targetBodyMoves: number;
  targetTimeInMillis: number;
  timeDancedInMillis: number;
  type: 'success' | 'fail';
  videoUrl: string;
};

export type StoryFinishScreenType = {
  totalTargetUserTimeInMillis: number;
  storySuccessText: string;
  totalTargetBodyMoves: number;
  successVideo: string;
};
