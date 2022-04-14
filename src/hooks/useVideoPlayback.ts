import {AVPlaybackStatus, Video} from 'expo-av';

export type VideoPlaybackTypes = 'play' | 'stop' | 'pause';

export type VideoStatusType = AVPlaybackStatus | null | undefined;

const useVideoPlayback = (
  ref: React.MutableRefObject<Video>,
  status: VideoStatusType = null,
) => {
  if (!status) return null;
  const handleUnloadVideo = async () => {
    ref?.current && (await ref.current.stopAsync());
    ref?.current && (await ref.current.unloadAsync());
  };
  const handleVideoPlayback = async (type: VideoPlaybackTypes) => {
    if (status.isLoaded) {
      switch (type) {
        case 'play':
          status.isPlaying && ref?.current.playAsync();
          break;
        case 'pause':
          status.isPlaying && ref?.current.pauseAsync();
          break;
        case 'stop':
          status.isPlaying && ref?.current.stopAsync();
          break;
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  return {handleUnloadVideo, handleVideoPlayback};
};

export default useVideoPlayback;
