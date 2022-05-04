import * as React from 'react';
import {useCountdown} from 'usehooks-ts';
import timeFormatter from 'format-duration';

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
import {ConfirmModal} from '../../components/Modal/ConfirmModal/ConfirmModal';
import {IconButton} from '../../components/Buttons/IconButton';
import {
  DanceStatsContainer,
  VideoStatsContainer,
  VideoStatusBackground,
} from './DanceScreen.styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentStory,
  getCurrentStoryChapters,
} from '../../features/game/slices/content.slice';
import useDanceSession from '../../hooks/useDanceSession';
import {theme} from '../../theme/theme';
import {
  ParamsType,
  GameStatusType,
  GameFinishType,
  GameSaveType,
} from './types';
import {screenTitle} from './generators';

interface Props {
  route: ParamsType;
}

export const DanceScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<GameNavigationType>();

  const {
    contentStoryId,
    videoUrl,
    chapterOrder,
    targetBodyMoves,
    targetTimeInMillis,
    timeSpentInMillis,
  } = route.params;

  const dispatch = useDispatch();

  const videoBackgroundRef = React.useRef<any>(null);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [gameStatus, setGameStatus] = React.useState<GameStatusType>('started');
  const [timeLeftToDance, setTimeLeftToDance] = React.useState(
    targetTimeInMillis - timeSpentInMillis || targetTimeInMillis,
  );

  const [count, {start: startTimer, stop: stopTimer, reset: resetTimer}] =
    useCountdown({
      seconds: timeLeftToDance / 1000,
      interval: 1000,
      isIncrement: false,
    });

  const currentStory = useSelector(getCurrentStory);
  const currentChapters = useSelector(getCurrentStoryChapters);

  const {
    startMoving,
    stopMoving,
    pedometerIsAvailable,
    stepCount,
    countRemainder,
    stepCountSoFar,
    stepsFinished,
  } = useDanceSession(targetBodyMoves);

  React.useEffect(() => {
    setGameStatus('started');
    // console.log('Pedometer', pedometerIsAvailable);
  }, []);

  React.useEffect(() => {
    if (gameStatus === 'paused') {
      handleGamePaused();
    } else if (gameStatus === 'started') {
      handleGameStarted();
    } else if (gameStatus === 'completed') {
      handleGameCompleted();
    }
    return () => {
      stopMoving();
    };
  }, [gameStatus]);

  /** END GAME */
  /** Did user finish body moves in time? */

  React.useEffect(() => {
    console.log('Adjusted Body Movement', stepCount);
    if (stepsFinished) {
      console.log('Done!');
      return setGameStatus('completed');
    }
  }, [stepCount, stepsFinished]);

  /** Did user run out of time before finishing body moves? */

  React.useEffect(() => {
    if (count === 0) {
      console.log('The time is done!');
      return setGameStatus('completed');
    }
  }, [count]);

  /** END GAME FINISHED */

  const _getGameFinishType = (): {status: GameFinishType} => {
    let status: GameFinishType;
    if (!stepsFinished && count <= 0) {
      status = 'interrupted';
    } else if (
      stepsFinished &&
      count > 0 &&
      chapterOrder === currentChapters.length
    ) {
      status = 'story_completed';
    } else if (stepsFinished && count > 0) {
      status = 'success';
    } else {
      status = 'failed';
    }
    // status = 'success';
    console.log('Status', status);
    return {status};
  };

  /** Game State Controls */
  const handleGamePaused = () => {
    setShowModal(true);
    stopMoving();
    stopTimer();
    videoBackgroundRef.current?.pauseVideo();

    return;
  };
  const handleGameStarted = () => {
    setShowModal(false);
    startTimer();
    startMoving();
    videoBackgroundRef.current?.playVideo();

    return;
  };
  const handleGameCompleted = async () => {
    stopMoving();
    stopTimer();
    const {status} = _getGameFinishType();
    switch (status) {
      case 'success':
        await handleSaveGame('moves_finished');
        navigation.navigate('ResultsScreen', {
          type: 'success',
          targetTimeInMillis,
          timeDancedInMillis: targetTimeInMillis,
          targetBodyMoves,
          bodyMoves: targetBodyMoves,
          videoUrl: currentStory?.successVideo || '',
        });
        break;
      case 'failed':
        await handleSaveGame('time_finished');
        navigation.navigate('ResultsScreen', {
          type: 'fail',
          targetTimeInMillis,
          timeDancedInMillis: 0,
          targetBodyMoves,
          bodyMoves: 0,
          videoUrl: currentStory?.failVideo || '',
        });
        break;
      case 'story_completed':
        await handleSaveGame('moves_finished');
        navigation.navigate('StoryFinish', {
          storySuccessText: currentStory?.storySuccessText || '',
          successVideo: currentStory?.successVideo || '',
          totalTargetBodyMoves: currentStory?.totalTargetBodyMoves || 0,
          totalTargetUserTimeInMillis:
            currentStory?.totalTargetUserTimeInMillis || 0,
        });
        break;
      case 'interrupted':
        await handleSaveGame('user_quit');
        return handleQuitDance();
      // navigation.navigate('StoryScreen', {contentStoryId});
      default:
        return null;
    }
  };

  const handleInterruptDance = async () => {
    if (gameStatus === 'paused') return setGameStatus('started');
    return setGameStatus('paused');
  };

  const handleQuitDance = async () => {
    await videoBackgroundRef.current?.unmountVideo();
    // save progress so far here by dispatching a save game
    // which means updating current chapter and current story
    navigation.navigate('StoryScreen', {contentStoryId});
  };

  const handleSaveGame = async (type: GameSaveType) => {
    switch (type) {
      case 'moves_finished':
        // do something
        break;
      case 'time_finished':
        // do something
        break;
      case 'user_quit':
        // do something
        break;
      default:
        return null;
    }
  };

  return (
    <>
      {showModal && (
        <ConfirmModal
          title="Are you sure?"
          onCancel={() => setGameStatus('started')}
          onConfirm={handleGameCompleted}
          content="If you quit now, you will lose your points?"
          confirm="Yes, quit"
          cancel="No, continue"
        />
      )}
      <SafeAreaView>
        <OverVideoContainer alignment="space-between">
          <PageHeaderGeneral title={screenTitle(currentStory, chapterOrder)} />
          <BaseFont variant="small-paragraph" color={theme.COLORS.yellow}>
            Time left
          </BaseFont>
          <BaseFont variant="number-big-bold">
            {timeFormatter(count * 1000, {leading: true})}
          </BaseFont>
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
                    Moves count {stepCountSoFar}
                  </BaseFont>
                  <Spacer h={5} />
                  <BaseFont
                    variant="number-big-bold"
                    color={theme.COLORS.yellow}>
                    {stepCount}
                  </BaseFont>
                </DanceStatsContainer>
                <DanceStatsContainer>
                  <BaseFont
                    variant="small-paragraph"
                    color={theme.COLORS.gray_300}>
                    Moves left
                  </BaseFont>
                  <Spacer h={5} />
                  <BaseFont variant="number-large">{countRemainder}</BaseFont>
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
