export type AnnouncementObjectTypes = {
  [key: string]: AnnouncementDataType;
};

export type AnnouncementDataType = {
  name: AnnouncementTypes;
  url: number;
};

export type AnnouncementTypes =
  | 'togo_fifty'
  | 'togo_hundred'
  | 'togo_two_hundred'
  | 'togo_five_hundred'
  | 'done_fifty'
  | 'done_hundred'
  | 'done_two_hundred'
  | 'done_five_hundred'
  | 'done_one_thousand'
  | 'done_two_thousand';

export const ANNOUNCEMENT_DATA: AnnouncementObjectTypes = {
  togo_fifty: {
    name: 'togo_fifty',
    url: require('../assets/audio/announce/togo_50.mp3'),
  },
  togo_hundred: {
    name: 'togo_hundred',
    url: require('../assets/audio/announce/togo_100.mp3'),
  },
  togo_two_hundred: {
    name: 'togo_two_hundred',
    url: require('../assets/audio/announce/togo_200.mp3'),
  },
  togo_five_hundred: {
    name: 'togo_five_hundred',
    url: require('../assets/audio/announce/togo_500.mp3'),
  },
  done_fifty: {
    name: 'done_fifty',
    url: require('../assets/audio/announce/done_50.mp3'),
  },
  done_hundred: {
    name: 'done_hundred',
    url: require('../assets/audio/announce/done_100.mp3'),
  },
  done_two_hundred: {
    name: 'done_two_hundred',
    url: require('../assets/audio/announce/done_200.mp3'),
  },
  done_five_hundred: {
    name: 'done_five_hundred',
    url: require('../assets/audio/announce/done_500.mp3'),
  },
  done_one_thousand: {
    name: 'done_one_thousand',
    url: require('../assets/audio/announce/done_1000.mp3'),
  },
  done_two_thousand: {
    name: 'done_two_thousand',
    url: require('../assets/audio/announce/done_2000.mp3'),
  },
};
