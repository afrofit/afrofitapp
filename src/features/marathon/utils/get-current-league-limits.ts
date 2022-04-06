type LeagueLimitsType = {
  [key: number]: {lowerLimit: number; upperLimit: number};
};

const LEAGUE_LIMITS: LeagueLimitsType = {
  1: {lowerLimit: 0, upperLimit: 25},
  2: {lowerLimit: 26, upperLimit: 46},
  3: {lowerLimit: 47, upperLimit: 53},
  4: {lowerLimit: 54, upperLimit: 64},
  5: {lowerLimit: 65, upperLimit: 70},
};

export const getCurrentLeagueLimits = (leagueCode: number) => {
  if (leagueCode > 5 && leagueCode < 1) return null;

  return {
    lowerLimit: LEAGUE_LIMITS[leagueCode].lowerLimit,
    upperLimit: LEAGUE_LIMITS[leagueCode].upperLimit,
  };
};
