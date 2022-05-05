import * as React from 'react';
import {useNavigation} from '@react-navigation/native';

import {BaseFont} from '../../components/Font/BaseFont';
import {GameNavigationType} from '../../types/navigation-types';
import {ResultsScreenType} from './types';
import {SafeAreaView} from 'react-native-safe-area-context';
import VideoBackground from '../../components/Video/VideoBackground';
import {
  ButtonsContainer,
  OverVideoContainer,
  VideoContentsContainer,
} from './StoryScreens.styles';
import PageHeaderGeneral from '../../components/Headers/PageHeaderGeneral/PageHeaderGeneral';
import {ThreeStars} from '../../components/Elements/ThreeStars/ThreeStars';
import Spacer from '../../components/Library/Spacer';
import {BaseButton} from '../../components/Buttons/BaseButton';
import {millisecondsToMinutes} from 'date-fns/esm';
import {useSelector} from 'react-redux';
import {getCurrentStoryChapter} from '../../features/game/slices/content.slice';
import {ChapterType} from '../../models/Chapter';

type UserProgressionType = 'restart' | 'continue';

type ParamsType = {
  params: ResultsScreenType;
};

interface Props {
  route: ParamsType;
}
export const DanceResultsScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<GameNavigationType>();

  const currentChapter = useSelector(getCurrentStoryChapter);

  // console.log('CurrChapt', currentChapter);

  const {
    bodyMoves,
    targetBodyMoves,
    targetTimeInMillis,
    timeDancedInMillis,
    videoUrl,
    type,
  } = route.params;

  const videoBackgroundRef = React.useRef<any>(null);

  const handleProgressStory = async (type: UserProgressionType) => {
    switch (type) {
      case 'continue':
        handleContinueStory();
        break;
      case 'restart':
        handleRestartChapter();
        break;
      default:
        return null;
    }
  };
  const handleExitGame = async () => {
    navigation.navigate('GameRoot');
  };

  const handleContinueStory = async () => {
    if (currentChapter) {
      navigation.navigate('StoryScreen', {
        contentStoryId: currentChapter?.contentStoryId,
      });
    }
  };

  const handleRestartChapter = async () => {
    return currentChapter
      ? navigation.navigate('ChapterScreen', {...currentChapter})
      : null;
  };

  const PROGRESSION_TYPE = type === 'success' ? 'continue' : 'restart';

  return (
    <>
      <SafeAreaView>
        <OverVideoContainer alignment="space-between">
          <PageHeaderGeneral
            title={type === 'success' ? 'Success!' : 'Oh no!'}
          />
          <VideoContentsContainer>
            <ThreeStars />
            <Spacer />
            {type === 'success' ? (
              <BaseFont>
                You did it! You managed {targetBodyMoves} dance moves in
                {millisecondsToMinutes(targetTimeInMillis as number)} minutes!
              </BaseFont>
            ) : (
              <BaseFont>
                Ah! you couldn't do it this time, but don't accept defeat! Try
                again!
              </BaseFont>
            )}
            <Spacer />
            <ThreeStars />
          </VideoContentsContainer>
          <ButtonsContainer>
            <BaseButton
              variant="red"
              text={type === 'success' ? 'Continue Story' : 'Try Again'}
              onPress={() => handleProgressStory(PROGRESSION_TYPE)}
              disabled={false}
            />
            <BaseButton disabled={false} text="Exit" onPress={handleExitGame} />
          </ButtonsContainer>
        </OverVideoContainer>
      </SafeAreaView>
      <VideoBackground
        videoURL={videoUrl as string}
        onVideoFinished={() => console.log('Video finished!')}
        onVideoHalfwayFinished={() => console.log('Video halfway finished')}
        ref={videoBackgroundRef}
      />
    </>
  );
};
