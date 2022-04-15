import * as React from 'react';
import {AVPlaybackStatus, Video} from 'expo-av';
import {millisecondsToSeconds} from 'date-fns';

import {AbsoluteLoader} from '../Loaders/AbsoluteLoader/AbsoluteLoader';
import {
  BackgroundVideoStyles,
  VideoContainer,
  VideoContentContainer,
} from './VideoBackground.styles';
import {PageWrapper, PageSafeAreaView} from '../Page/Page.styles';

interface Props {
  videoURL?: string;
  onVideoFinished: () => void;
  onVideoHalfwayFinished: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  children?: React.ReactNode;
  loop?: boolean;
}

const VideoBackground = (
  {
    videoURL,
    onVideoFinished,
    onVideoHalfwayFinished,
    children,
    loop = false,
  }: Props,
  ref: React.Ref<any>,
) => {
  const [videoLoading, setVideoLoading] = React.useState(false);
  const [videoStatus, setVideoStatus] =
    React.useState<AVPlaybackStatus | null>();

  const videoRef = React.useRef<Video>(null);

  React.useEffect(() => {
    return () => {
      unloadVideo().then(() => console.log('Video unloaded!'));
    };
  }, []);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setVideoStatus(status);

      if (
        millisecondsToSeconds(status.positionMillis) ===
        Math.ceil(millisecondsToSeconds(status.durationMillis!) / 2)
      ) {
        return onVideoHalfwayFinished();
      }
      if (status.didJustFinish) {
        return onVideoFinished();
      }
    }
  };

  const unloadVideo = async () => {
    await videoRef?.current?.stopAsync();
    return videoRef?.current?.unloadAsync();
  };

  React.useImperativeHandle(
    ref,
    () => ({
      pauseVideo: async () => {
        await videoRef?.current?.pauseAsync();
        // if (videoStatus?.isLoaded) {
        //   if (videoStatus.isPlaying) {
        //     await videoRef?.current?.pauseAsync();
        //   }
        // }
      },

      playVideo: async () => {
        await videoRef?.current?.playAsync();
        // if (videoStatus?.isLoaded) {
        //   if (!videoStatus.isPlaying) {
        //     await videoRef?.current?.playAsync();
        //   }
        // }
      },
      unmountVideo: async () => {
        await videoRef?.current?.stopAsync();
        return videoRef?.current?.unloadAsync();
      },
    }),
    [],
  );

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
          isLooping={loop}
          rate={1}
          onLoadStart={() => setVideoLoading(true)}
          onLoad={() => setVideoLoading(false)}>
          <PageWrapper>
            <PageSafeAreaView>
              <VideoContentContainer>{children}</VideoContentContainer>
            </PageSafeAreaView>
          </PageWrapper>
        </Video>
      )}
    </VideoContainer>
  );
};

export default React.forwardRef(VideoBackground);
