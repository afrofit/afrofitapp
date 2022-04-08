export type RankDataType = {
  [index: number]: RankType;
};

export type RankType = {
  src: number;
  name: string;
  id: number;
  limits: {min: number; max: number};
  advancers: number;
};

export const RANKS_DATA: RankDataType = {
  5: {
    src: require('../assets/images/ranks/rookie.png'),
    name: 'Rookie',
    id: 1,
    limits: {min: 50, max: 75},
    advancers: 20,
  },
  4: {
    src: require('../assets/images/ranks/core.png'),
    name: 'Core',
    id: 2,
    limits: {min: 30, max: 50},
    advancers: 20,
  },
  3: {
    src: require('../assets/images/ranks/super.png'),
    name: 'Super',
    id: 3,
    limits: {min: 15, max: 30},
    advancers: 10,
  },
  2: {
    src: require('../assets/images/ranks/peak.png'),
    name: 'Peak',
    id: 4,
    limits: {min: 5, max: 15},
    advancers: 10,
  },
  1: {
    src: require('../assets/images/ranks/superstar.png'),
    name: 'Superstar',
    id: 5,
    limits: {min: 0, max: 5},
    advancers: 5,
  },
};
