import * as React from 'react';
import {Audio} from 'expo-av';

const useAnnouncer = () => {
  const [announcement, setAnnouncement] = React.useState<Audio.Sound | null>();

  const loadAnnouncement = async (url: string) => {
    const {sound} = await Audio.Sound.createAsync({uri: url});
    setAnnouncement(sound);
    sound.playAsync();
  };

  const unloadAnnouncement = async () => {
    await announcement?.unloadAsync();
  };

  return {loadAnnouncement, unloadAnnouncement};
};

export default useAnnouncer;
