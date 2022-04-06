import {UserMarathonTypes} from '../types/marathon.types';

export const findUserIndex = (
  userMarathonScore: UserMarathonTypes | null,
  performersArray: UserMarathonTypes[],
) => {
  if (!userMarathonScore || !performersArray || !performersArray.length)
    return null;

  let currentUserMarathonScoreIndex;

  for (const [index, score] of performersArray.entries()) {
    if (score.id === userMarathonScore.id) {
      currentUserMarathonScoreIndex = index;
      break;
    }
  }

  if (currentUserMarathonScoreIndex === undefined) return null;
  return currentUserMarathonScoreIndex;
};
