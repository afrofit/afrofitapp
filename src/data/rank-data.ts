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
  1: {
    src: require('../assets/images/ranks/rookie.png'),
    name: 'Rookie',
    id: 1,
    limits: {min: 0, max: 25},
    advancers: 20,
  },
  2: {
    src: require('../assets/images/ranks/core.png'),
    name: 'Core',
    id: 2,
    limits: {min: 0, max: 20},
    advancers: 20,
  },
  3: {
    src: require('../assets/images/ranks/super.png'),
    name: 'Super',
    id: 3,
    limits: {min: 0, max: 15},
    advancers: 10,
  },
  4: {
    src: require('../assets/images/ranks/peak.png'),
    name: 'Peak',
    id: 4,
    limits: {min: 0, max: 10},
    advancers: 10,
  },
  5: {
    src: require('../assets/images/ranks/superstar.png'),
    name: 'Superstar',
    id: 5,
    limits: {min: 0, max: 5},
    advancers: 5,
  },
};
