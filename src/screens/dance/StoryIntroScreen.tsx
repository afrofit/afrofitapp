import * as React from 'react';

import {VideoBackground} from '../../components/Video/VideoBackground';
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

type ParamsType = {
  params: {[key in keyof StorySummaryModel]: string | boolean};
};

interface Props {
  route: ParamsType;
}

export const StoryIntroScreen: React.FC<Props> = ({route}) => {
  const {contentStoryId, completed, started, instruction, introVideo, title} =
    route.params;

  console.log(title, contentStoryId);

  const handleStartStory = async () => {};
  const handleQuitStory = async () => {};

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
              onPress={() => console.log('Start Story')}
              disabled
            />
            <BaseButton
              disabled
              text="Exit"
              onPress={() => console.log('Exit Story')}
            />
          </ButtonsContainer>
        </OverVideoContainer>
      </SafeAreaView>
      <VideoBackground
        videoURL={introVideo as string}
        onVideoFinished={() => console.log('Video finished!')}
        onVideoHalfwayFinished={() => console.log('video halfway finished')}
      />
    </>
  );
};
