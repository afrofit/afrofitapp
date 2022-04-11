import {AVPlaybackStatus, Video} from 'expo-av';
import * as React from 'react';
import {millisecondsToSeconds} from 'date-fns';

import {AbsoluteLoader} from '../Loaders/AbsoluteLoader/AbsoluteLoader';
import {
  BackgroundVideoStyles,
  VideoContainer,
  VideoContentContainer,
} from './VideoBackground.styles';
import {PageWrapper, PageSafeAreaView} from '../Page/Page.styles';
import PageHeaderGeneral from '../Headers/PageHeaderGeneral/PageHeaderGeneral';

const video = require('../../assets/video/story/chapter1/chapter1_intro.mp4');
const VIDEO_URL = '../../assets/video/story/chapter1/chapter1_intro.mp4';

interface Props {
  videoURL?: string;
  onVideoFinished: () => void;
  onVideoHalfwayFinished: () => void;
}

export const VideoBackground: React.FC<Props> = ({
  videoURL,
  onVideoFinished,
  onVideoHalfwayFinished,
  children,
}) => {
  const [videoLoading, setVideoLoading] = React.useState(false);
  const [videoStatus, setVideoStatus] =
    React.useState<AVPlaybackStatus | null>();

  console.log('VideoURL', videoURL);

  const videoRef = React.useRef<any>(null);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setVideoStatus(status);

      if (
        millisecondsToSeconds(status.positionMillis) ===
        Math.ceil(millisecondsToSeconds(status.durationMillis!) / 2)
      ) {
        //do something because video is halfway done
        return onVideoHalfwayFinished();
      }
      if (status.didJustFinish) {
        //do something
        return onVideoFinished();
        // console.log('Status', status);
      }
    }
  };

  return (
    <VideoContainer>
      {videoLoading && <AbsoluteLoader message="Video loading..." />}
      {videoURL && (
        <Video
          ref={videoRef}
          source={{uri: videoURL!}}
          style={BackgroundVideoStyles.video}
          resizeMode={Video.RESIZE_MODE_COVER}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          shouldPlay={true}
          isLooping={false}
          rate={1}
          onLoadStart={() => setVideoLoading(true)}
          onLoad={() => setVideoLoading(false)}>
          <PageWrapper>
            <PageSafeAreaView>
              <PageHeaderGeneral title="More your know" />
              <VideoContentContainer>{children}</VideoContentContainer>
            </PageSafeAreaView>
          </PageWrapper>
        </Video>
      )}
    </VideoContainer>
  );
};
