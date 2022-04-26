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
import {getCurrentStory} from '../../features/game/slices/content.slice';
import {millisecondsToMinutes} from 'date-fns';
import useDanceSession from '../../hooks/useDanceSession';
import {theme} from '../../theme/theme';
import useInterval from '../../hooks/useInterval';

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
  const [timeDanced, setTimeDanced] = React.useState(
    targetTimeInMillis - timeSpentInMillis || targetTimeInMillis,
  );
  const [delay, setDelay] = React.useState<number | null>(1000);

  const currentStory = useSelector(getCurrentStory);

  /** Timer System */
  if (delay) {
    useInterval(() => {
      setTimeDanced(timeDanced - 1000);
    }, delay as number);
  }

  const {
    startMoving,
    stopMoving,
    pedometerIsAvailable,
    adjustedCount,
    countRemainder,
  } = useDanceSession(targetBodyMoves, targetTimeInMillis);

  React.useEffect(() => {
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
      setDelay(null);
      _getGameFinishType();
    }
    return () => {
      stopMoving();
    };
  }, [gameStatus]);

  /** Did user finish body moves in time? */

  React.useEffect(() => {
    console.log('Adjusted Body Movement', adjustedCount);
    if (adjustedCount === targetBodyMoves) {
      console.log('Done!');
      return setGameStatus('completed');
    }
  }, [adjustedCount]);

  /** Did user run out of time before finishing body moves? */

  React.useEffect(() => {
    if (timeDanced <= 0) {
      console.log('The time is done!');
      return setGameStatus('completed');
    }
  }, [timeDanced]);

  const _getGameFinishType = () => {
    // This function gets the game finish type
    // By checking conditions
    // then it calls handleGameFinished with the right status type
    handleGameFinished('failed');
  };

  const handleGamePaused = () => {};
  const handleGameStarted = () => {};
  const handleGameCompleted = () => {};

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
    setDelay(null);
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

  const parsedTimeDanced = millisecondsToMinutes(timeDanced);

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
          <BaseFont variant="bold-paragraph">
            {parsedTimeDanced} Minute{parsedTimeDanced > 1 ? 's' : ''} Left
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
                    Current moves
                  </BaseFont>
                  <Spacer h={5} />
                  <BaseFont
                    variant="number-big-bold"
                    color={theme.COLORS.yellow}>
                    {adjustedCount}
                  </BaseFont>
                </DanceStatsContainer>
                <DanceStatsContainer>
                  <BaseFont
                    variant="small-paragraph"
                    color={theme.COLORS.gray_300}>
                    Moves target
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
