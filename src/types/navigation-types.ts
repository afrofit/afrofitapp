import {StackNavigationProp} from '@react-navigation/stack';
import {
  GameStackParamList,
  GameScreensStackParamList,
} from '../navigator/GameNavigator';

export type GameNavigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  | 'Home'
  | 'DanceScreen'
  | 'StoryScreen'
  | 'StoryIntroScreen'
  | 'StoryFinish'
  | 'GameRoot'
  | 'ResultsScreen'
  | 'ChapterScreen'
>;
