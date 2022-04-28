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
import {getCurrentStory} from '../../features/game/slices/content.slice';
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
  const [timeDanced, setTimeDanced] = React.useState(
    targetTimeInMillis - timeSpentInMillis || targetTimeInMillis,
  );

  const [count, {start: startTimer, stop: stopTimer, reset: resetTimer}] =
    useCountdown({
      seconds: timeDanced / 1000,
      interval: 1000,
      isIncrement: false,
    });

  const currentStory = useSelector(getCurrentStory);

  const {
    startMoving,
    stopMoving,
    pedometerIsAvailable,
    adjustedCount,
    countRemainder,
  } = useDanceSession(targetBodyMoves);

  React.useEffect(() => {
    setGameStatus('started');
    startTimer();
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
    let status: GameFinishType;
    if ('story_completed') {
      status = 'story_completed';
    } else if ('failed') {
      status = 'failed';
    } else if ('interrupted') {
      status = 'interrupted';
    } else {
      status = 'success';
    }

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
  const handleGameCompleted = () => {
    stopMoving();
    const {status} = _getGameFinishType();
    if (status) {
      return handleSaveGame('moves_finished');
    } else {
      return handleSaveGame('user_quit');
    }
  };

  const handleInterruptDance = async () => {
    if (gameStatus === 'paused') return setGameStatus('started');
    return setGameStatus('paused');
  };

  const handleQuitDance = async () => {
    await videoBackgroundRef.current?.unmountVideo();
    // save progress so far here
    // Then Dispatch save game
    // which means updating current chapter and current story
    navigation.navigate('StoryScreen', {contentStoryId});
  };

  const handleSaveGame = async (type: GameSaveType) => {};

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
