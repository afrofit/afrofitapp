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
import {BaseButton} from '../../components/Buttons/BaseButton';
import {ThreeStars} from '../../components/Elements/ThreeStars/ThreeStars';
import {StorySummaryModel} from '../../types/types';

import {useNavigation} from '@react-navigation/native';
import {GameNavigationType} from '../../types/navigation-types';

type ParamsType = {
  params: {[key in keyof StorySummaryModel]: string | boolean};
};

interface Props {
  route: ParamsType;
}

export const StoryIntroScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<GameNavigationType>();

  const videoBackgroundRef = React.useRef<any>(null);

  const [disableButtons, setDisableButtons] = React.useState<boolean>(true);

  const {contentStoryId, completed, started, instruction, introVideo, title} =
    route.params;

  //   console.log(title, contentStoryId);

  const pauseVideo = () => {
    videoBackgroundRef.current?.pauseVideo();
  };
  const playVideo = () => {
    videoBackgroundRef.current?.playVideo();
  };

  const handleStartStory = async () => {
    await videoBackgroundRef.current?.unmountVideo();
    navigation.navigate('StoryScreen', {
      contentStoryId: contentStoryId as string,
    });
  };

  const handleQuitStory = async () => {
    await videoBackgroundRef.current?.unmountVideo();
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView>
        <OverVideoContainer alignment="space-between">
          <PageHeaderGeneral title={title as string} />
          <VideoContentsContainer>
            <ThreeStars />
            <Spacer />
            <BaseFont>{instruction}</BaseFont>
            <Spacer />
            <ThreeStars />
          </VideoContentsContainer>
          <ButtonsContainer>
            <BaseButton
              variant="red"
              text="Start Story"
              onPress={handleStartStory}
              disabled={disableButtons}
            />
            <BaseButton
              disabled={disableButtons}
              text="Exit"
              onPress={handleQuitStory}
            />
          </ButtonsContainer>
        </OverVideoContainer>
      </SafeAreaView>
      <VideoBackground
        videoURL={introVideo as string}
        onVideoFinished={() => console.log('Video finished!')}
        onVideoHalfwayFinished={() => setDisableButtons(false)}
        ref={videoBackgroundRef}
      />
    </>
  );
};
