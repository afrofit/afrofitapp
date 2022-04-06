import * as React from 'react';

import {useSelector} from 'react-redux';
import {
  getTopPerformers,
  getUserMarathonIndex,
  getUserMarathonLeague,
  getUserMarathonScore,
  setCurrentUserIndex,
  setCurrentUserLeagueCode,
} from '../../../features/marathon/marathon.slice';
import {getCurrentUser} from '../../../features/auth/user.slice';

import {StackNavigationProp} from '@react-navigation/stack';

import {Page} from '../../../components/Page/Page';
import {
  GameScreensStackParamList,
  GameStackParamList,
} from '../../../navigator/GameNavigator';
import PageHeaderLarge from '../../../components/Headers/PageHeaderLarge/PageHeaderLarge';
import {useDispatch} from 'react-redux';
import {MarathonScroller} from './Marathon.Screen.styles';
import {fetchMarathonData} from '../../../features/marathon/thunks/fetch-marathon-data-thunk';
import {MarathonLeagueCard} from '../../../features/marathon/components/MarathonLeagueCard/MarathonLeagueCard';
import {findUserIndex} from '../../../features/marathon/utils/find-user-index';
import {checkCurrentUserPosition} from '../../../features/marathon/utils/check-current-user-pos';
import {getCurrentLeagueLimits} from '../../../features/marathon/utils/get-current-league-limits';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const MarathonScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser);
  const userMarathonScore = useSelector(getUserMarathonScore);
  const topPerformersArray = useSelector(getTopPerformers);
  const userMarathonIndex = useSelector(getUserMarathonIndex);
  const userMarathonLeague = useSelector(getUserMarathonLeague);

  React.useEffect(() => {
    dispatch(fetchMarathonData());
  }, []);

  React.useEffect(() => {
    if (userMarathonLeague) {
      //do something
    }
  }, [userMarathonIndex, userMarathonLeague]);

  const currentUserIndex = findUserIndex(userMarathonScore, topPerformersArray);
  let currentUserLeague;

  if (currentUserIndex) {
    dispatch(setCurrentUserIndex(currentUserIndex));
    currentUserLeague = checkCurrentUserPosition(currentUserIndex);
    if (currentUserLeague && currentUserLeague > 0) {
      dispatch(setCurrentUserLeagueCode(currentUserLeague));
    }
  }

  const limit = getCurrentLeagueLimits(userMarathonLeague);

  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderLarge title="Marathon" />
      <MarathonLeagueCard visibleRank={2} />
      {userMarathonLeague && (
        <MarathonScroller>
          {/* {currentLeague.map((member, index: number) => {
            <RankingCard
              key={member.id}
              rankPosition={index + 1}
              currentUser={currentUser.id == member.userId}
              username={member.username}
              bodyMoves={member.bodyMoves}
            />;
          })} */}
        </MarathonScroller>
      )}
    </Page>
  );
};
