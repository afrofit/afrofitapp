import * as React from 'react';

import VideoBackground from '../../components/Video/VideoBackground';
import PageHeaderGeneral from '../../components/Headers/PageHeaderGeneral/PageHeaderGeneral';
import {BaseFont} from '../../components/Font/BaseFont';
import {SafeAreaView} from 'react-native';
import {
  ButtonsContainer,
  OverVideoContainer,
  VideoContentsContainer,
} from './StoryScreens.styles';
import Spacer from '../../components/Library/Spacer';
import {ThreeStars} from '../../components/Elements/ThreeStars/ThreeStars';

import {useNavigation} from '@react-navigation/native';
import {GameNavigationType} from '../../types/navigation-types';
import {ChapterType} from '../../models/Chapter';
import {ConfirmModal} from '../../components/Modal/ConfirmModal/ConfirmModal';
import {IconButton} from '../../components/Buttons/IconButton';
import {
  DanceStatsContainer,
  VideoStatsContainer,
  VideoStatusBackground,
} from './DanceScreen.styles';
import {useDispatch, useSelector} from 'react-redux';
import {OneStar} from '../../components/Elements/OneStar/OneStar';
import {getCurrentStory} from '../../features/game/slices/content.slice';
import {millisecondsToMinutes} from 'date-fns';
import useDanceSession from '../../hooks/useDanceSession';
import {theme} from '../../theme/theme';

type GameStatusType = 'started' | 'paused' | 'completed';

type GameFinishType = 'story_completed' | 'success' | 'failed';

type ParamsType = {
  params: ChapterType;
};

interface Props {
  route: ParamsType;
}

export const DanceScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<GameNavigationType>();

  const dispatch = useDispatch();

  const videoBackgroundRef = React.useRef<any>(null);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [gameStatus, setGameStatus] = React.useState<GameStatusType>('started');

  const {
    contentStoryId,
    videoUrl,
    chapterOrder,
    targetBodyMoves,
    targetTimeInMillis,
  } = route.params;

  const currentStory = useSelector(getCurrentStory);

  const {
    startMoving,
    stopMoving,
    pedometerIsAvailable,
    adjustedCount,
    stepCount,
    countRemainder,
    finalTime,
    setTimer,
  } = useDanceSession(targetBodyMoves);

  React.useEffect(() => {
    setTimer(targetTimeInMillis);
    setGameStatus('started');
    console.log('Pedometer', pedometerIsAvailable);
  }, []);

  React.useEffect(() => {
    if (gameStatus === 'paused') {
      setShowModal(true);
      stopMoving();
      handlePauseVideo();
    } else if (gameStatus === 'started') {
      setShowModal(false);
      startMoving();
      handlePlayVideo();
    } else if (gameStatus === 'completed') {
      stopMoving();
      _getGameFinishType();
    }
    return () => {
      stopMoving();
    };
  }, [gameStatus]);

  React.useEffect(() => {
    console.log('Adjusted Body Movement', adjustedCount);
    console.log('Body Movement', stepCount);
  }, [adjustedCount]);

  const _getGameFinishType = () => {
    // This function gets the game finish type
    // then it calls handleGameFinished with the right status type
    handleGameFinished('failed');
  };

  const handlePauseVideo = () => {
    videoBackgroundRef.current?.pauseVideo();
  };
  const handlePlayVideo = () => {
    videoBackgroundRef.current?.playVideo();
  };

  const handleInterruptDance = async () => {
    if (gameStatus === 'paused') return setGameStatus('started');
    return setGameStatus('paused');
  };

  const handleQuitDance = async () => {
    await videoBackgroundRef.current?.unmountVideo();
    // save progress here
    // Then Dispatch save game
    // which means updating current chapter and current story
    navigation.navigate('StoryScreen', {contentStoryId});
  };

  const handleGameFinished = async (finishType: GameFinishType) => {
    switch (finishType) {
      case 'failed':
        // do sumthing
        break;

      case 'story_completed':
        // do sumthing
        break;
      case 'success':
        // do sumthing
        break;
      default:
        return null;
    }
    // In here, we will compare times and bodyMovements to determine
  };

  const handleSaveGame = async () => {};

  // Generators
  const screenTitle = () => {
    const storyTitle = currentStory?.title
      ? currentStory.title
      : 'Loading name...';
    const chapterTitle = 'Chapter ' + chapterOrder;
    return `${storyTitle} // ${chapterTitle}`;
  };

  const targetTime = millisecondsToMinutes(targetTimeInMillis);

  return (
    <>
      {showModal && (
        <ConfirmModal
          title="Are you sure?"
          onCancel={() => setGameStatus('started')}
          onConfirm={handleQuitDance}
          content="If you quit now, you will lose your points?"
          confirm="Yes, quit"
          cancel="No, continue"
        />
      )}
      <SafeAreaView>
        <OverVideoContainer alignment="space-between">
          <PageHeaderGeneral title={screenTitle()} />
          <BaseFont variant="bold-paragraph">{finalTime} Minutes Left</BaseFont>
          <VideoContentsContainer>
            <Spacer h={10} />
            <ThreeStars />
            <Spacer />
            <VideoStatusBackground>
              <VideoStatsContainer>
                <DanceStatsContainer left>
                  <BaseFont
                    variant="small-paragraph"
                    color={theme.COLORS.gray_300}>
                    current steps {' | '}
                  </BaseFont>
                  <Spacer h={5} />
                  <BaseFont
                    variant="number-big-bold"
                    color={theme.COLORS.yellow}>
                    {/* {stepCount}:{countRemainder} */}
                    2000
                  </BaseFont>
                </DanceStatsContainer>
                <DanceStatsContainer>
                  <BaseFont
                    variant="small-paragraph"
                    color={theme.COLORS.gray_300}>
                    {' | '} steps left
                  </BaseFont>
                  <Spacer h={5} />
                  <BaseFont variant="number-large">
                    {/* {stepCount}:{countRemainder} */}
                    2000
                  </BaseFont>
                </DanceStatsContainer>
              </VideoStatsContainer>
            </VideoStatusBackground>
          </VideoContentsContainer>
          <ButtonsContainer>
            <IconButton onPress={handleInterruptDance} />
          </ButtonsContainer>
        </OverVideoContainer>
      </SafeAreaView>
      <VideoBackground
        loop={true}
        videoURL={videoUrl}
        onVideoFinished={() => null}
        onVideoHalfwayFinished={() => null}
        ref={videoBackgroundRef}
      />
    </>
  );
};
