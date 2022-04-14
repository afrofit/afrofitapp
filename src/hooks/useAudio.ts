import * as React from 'react';
import {Audio} from 'expo-av';

const useAudio = (url: string) => {
  const [audio, setAudio] = React.useState<Audio.Sound | null>(null);

  const loadSound = async () => {
    const {sound} = await Audio.Sound.createAsync({uri: url});
    setAudio(sound);
    sound.playAsync();
  };

  const handleUnloadSound = async () => {
    await audio?.unloadAsync();
  };

  const handlePlayback = async () => {
    loadSound();
  };

  return {handleUnloadSound, handlePlayback};
};

export default useAudio;
