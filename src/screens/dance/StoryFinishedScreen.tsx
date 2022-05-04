import * as React from 'react';
import {useNavigation} from '@react-navigation/native';

import {BaseFont} from '../../components/Font/BaseFont';
import {Page} from '../../components/Page/Page';
import {GameNavigationType} from '../../types/navigation-types';
import {ResultsScreenType, StoryFinishScreenType} from './types';
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

type UserProgressionType = 'restart' | 'continue';

type ParamsType = {
  params: {[key in keyof StoryFinishScreenType]: string | boolean | number};
};

interface Props {
  route: ParamsType;
}
export const StoryFinishedScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<GameNavigationType>();
  // console.log(route.params);

  const {
    totalTargetUserTimeInMillis,
    storySuccessText,
    totalTargetBodyMoves,
    successVideo,
  } = route.params;

  console.log(route.params);

  const videoBackgroundRef = React.useRef<any>(null);

  const handleContinue = async () => {
    navigation.navigate('GameRoot');
  };

  return (
    <>
      <SafeAreaView>
        <OverVideoContainer alignment="space-between">
          <PageHeaderGeneral title="Congrats!!" />
          <VideoContentsContainer>
            <BaseFont variant="bold-paragraph">
              {totalTargetBodyMoves} moves in{' '}
              {millisecondsToMinutes(totalTargetUserTimeInMillis as number)}{' '}
              minutes!
            </BaseFont>
            <Spacer />
            <ThreeStars />
            <Spacer />
            <BaseFont>{storySuccessText as string} </BaseFont>

            <Spacer />
            <ThreeStars />
          </VideoContentsContainer>
          <ButtonsContainer>
            <BaseButton
              disabled={false}
              text="Finish"
              onPress={handleContinue}
              variant="red"
            />
          </ButtonsContainer>
        </OverVideoContainer>
      </SafeAreaView>
      <VideoBackground
        videoURL={successVideo as string}
        onVideoFinished={() => console.log('Video finished!')}
        onVideoHalfwayFinished={() => console.log('Video halfway finished')}
        ref={videoBackgroundRef}
      />
    </>
  );
};
