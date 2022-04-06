type RankRangeKeysType = keyof typeof RANK_RANGES;

type RankRangeType = {
  [key: string]: {start: number; end: number};
};

const RANK_RANGES: RankRangeType = {
  ROOKIE: {start: 0, end: 25},
  CORE: {start: 26, end: 46},
  SUPER: {start: 47, end: 53},
  PEAK: {start: 54, end: 64},
  SUPERSTAR: {start: 65, end: 70},
};

export const checkCurrentUserPosition = (
  currentUserIndex: number | null,
): number => {
  let finalNum = -1;
  if (!currentUserIndex) return -1;
  Object.keys(RANK_RANGES).map((value: RankRangeKeysType, index: number) => {
    if (
      currentUserIndex >= RANK_RANGES[value].start &&
      currentUserIndex <= RANK_RANGES[value].end
    ) {
      finalNum = index + 1;
      return;
    }
  });
  return finalNum;
};
