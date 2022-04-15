import * as React from 'react';
import {millisecondsToMinutes} from 'date-fns';

import {BaseButton} from '../../components/Buttons/BaseButton';
import {BaseFont} from '../../components/Font/BaseFont';
import {NotifyScreensHeader} from '../../components/Headers/NotifyScreensHeader/NotifyScreensHeader';
import Spacer from '../../components/Library/Spacer';
import {Page} from '../../components/Page/Page';
import {ChapterType} from '../../models/Chapter';
import {theme} from '../../theme/theme';
import {ButtonsContainer, ScreenMidContainer} from './StoryScreens.styles';
import {ThreeStars} from '../../components/Elements/ThreeStars/ThreeStars';
import {Linking, Platform} from 'react-native';
import {BaseCard} from '../../components/Cards/BaseCard';
import {MIXCLOUD_URL} from '../../constants/external-urls';
import useAudio from '../../hooks/useAudio';
import {useNavigation} from '@react-navigation/native';
import {GameNavigationType} from '../../types/navigation-types';
import {ClearButton} from '../../components/Buttons/ClearButton';

type ParamsType = {
  params: ChapterType;
};

interface Props {
  route: ParamsType;
}

export const ChapterScreen: React.FC<Props> = ({route}) => {
  console.log('Route Params', route.params);
  const {audioUrl, instruction, targetTimeInMillis, targetBodyMoves} =
    route.params;

  const navigation = useNavigation<GameNavigationType>();

  const {handleUnloadSound, handlePlayback} = useAudio(audioUrl);

  React.useEffect(() => {
    const startAudio = async () => {
      await handlePlayback();
    };
    startAudio();

    return () => {
      handleUnloadSound();
    };
  }, []);

  const handleQuitChapter = async () => {
    await handleUnloadSound();
    navigation.goBack();
  };

  const handleStartDance = async () => {
    await handleUnloadSound();
    navigation.navigate('DanceScreen', {...route.params});
  };

  const handleMinimizeApp = () => {
    Linking.openURL(MIXCLOUD_URL);
    // if (Platform.OS === 'ios') return Linking.openURL('music://');
  };

  return (
    <Page>
      <NotifyScreensHeader title="Ready?" />
      <ScreenMidContainer>
        <BaseFont>
          You've got to record at least{' '}
          <BaseFont variant="bold-paragraph" color={theme.COLORS.yellow}>
            {targetBodyMoves}
          </BaseFont>{' '}
          body movements to get past this chapter and you've only got{' '}
          <BaseFont variant="bold-paragraph" color={theme.COLORS.yellow}>
            {millisecondsToMinutes(targetTimeInMillis)}
          </BaseFont>{' '}
          minutes for to complete it! Good luck!
        </BaseFont>
        <Spacer h={30} />
        <ThreeStars />
        <Spacer h={30} />

        <BaseCard>
          <BaseFont variant="small-tagline" color={theme.COLORS.yellow}>
            Need music?
          </BaseFont>
          <Spacer />
          <BaseFont variant="small-paragraph" color={theme.COLORS.gray_300}>
            Tap the button below to play a special Afrofit DJ Mix
          </BaseFont>
          <Spacer />
          <BaseButton
            variant="white"
            text="Play DJ Mix"
            onPress={handleMinimizeApp}
          />
          <Spacer />
          <BaseFont variant="small-paragraph" color={theme.COLORS.gray_400}>
            Or minimize the app to use your preferred your music.
          </BaseFont>
        </BaseCard>
      </ScreenMidContainer>
      <ButtonsContainer>
        <BaseButton
          variant="red"
          text="Dance Now!"
          onPress={handleStartDance}
        />
        <ClearButton
          variant="gray"
          text="Quit Story"
          onPress={handleQuitChapter}
        />
      </ButtonsContainer>
    </Page>
  );
};
