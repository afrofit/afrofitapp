type LeagueLimitsType = {
  [key: number]: {name: string; lowerLimit: number; upperLimit: number};
};

const LEAGUE_LIMITS: LeagueLimitsType = {
  1: {name: 'Superstar', lowerLimit: 0, upperLimit: 5},
  2: {name: 'Peak', lowerLimit: 5, upperLimit: 15},
  3: {name: 'Super', lowerLimit: 15, upperLimit: 30},
  4: {name: 'Core', lowerLimit: 30, upperLimit: 50},
  5: {name: 'Rookie', lowerLimit: 50, upperLimit: 75},
};

export const getCurrentLeagueLimits = (leagueCode: number) => {
  if (leagueCode > 5 && leagueCode < 1) return null;

  return {
    name: LEAGUE_LIMITS[leagueCode].name,
    lowerLimit: LEAGUE_LIMITS[leagueCode].lowerLimit,
    upperLimit: LEAGUE_LIMITS[leagueCode].upperLimit,
  };
};
