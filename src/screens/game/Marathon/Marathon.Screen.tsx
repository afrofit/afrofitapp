import * as React from 'react';

import {useSelector} from 'react-redux';
import {
  getActiveLeague,
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
import {useDispatch} from 'react-redux';
import {MarathonScroller} from './Marathon.Screen.styles';
import {fetchMarathonData} from '../../../features/marathon/thunks/fetch-marathon-data-thunk';
import {MarathonLeagueCard} from '../../../features/marathon/components/MarathonLeagueCard/MarathonLeagueCard';
import {RankingsCard} from '../../../features/marathon/components/RankingsCard/RankingsCard';
import PageHeaderGeneral from '../../../components/Headers/PageHeaderGeneral/PageHeaderGeneral';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const MarathonScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser);
  const currentUserIndex = useSelector(getUserMarathonIndex);
  const activeLeague = useSelector(getActiveLeague);
  const userMarathonIndex = useSelector(getUserMarathonIndex);
  const userMarathonLeague = useSelector(getUserMarathonLeague);

  React.useEffect(() => {
    dispatch(fetchMarathonData());
  }, []);

  React.useEffect(() => {
    console.log('Active League', activeLeague);
    console.log('CurrentUser index', currentUserIndex);
  }, [activeLeague, currentUserIndex]);

  React.useEffect(() => {
    if (userMarathonLeague) {
      //do something
    }
  }, [userMarathonIndex, userMarathonLeague]);

  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderGeneral title="Marathon" />
      <MarathonLeagueCard visibleRank={activeLeague?.leagueCode || 1} />
      {currentUser && userMarathonLeague && (
        <MarathonScroller>
          {activeLeague &&
            activeLeague.array.map((performer, index) => {
              return (
                <RankingsCard
                  key={performer.id}
                  rankPosition={index + 1}
                  currentUser={currentUser.id === performer.userId}
                  username={performer.username}
                  bodyMoves={performer.bodyMoves}
                />
              );
            })}
          {/* <RankingsCard rankPosition={2} currentUser={!!currentUser} /> */}
        </MarathonScroller>
      )}
    </Page>
  );
};
