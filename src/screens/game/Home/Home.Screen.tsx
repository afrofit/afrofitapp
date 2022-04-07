import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Page} from '../../../components/Page/Page';
import {
  GameScreensStackParamList,
  GameStackParamList,
} from '../../../navigator/GameNavigator';
import PageHeaderSmall from '../../../components/Headers/PageHeaderSmall/PageHeaderSmall';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../../features/auth/user.slice';
import {fetchAllStories} from '../../../features/game/thunks/fetch-all-stories-thunk';
import {getAllStories} from '../../../features/game/slices/content.slice';
import StoryList from '../../../features/game/components/StoryList/StoryList';
import {getSubscriptionOfferings} from '../../../features/subscription/thunks/get-subscription-offers-thunk';
import HomeStatsCard from '../../../features/game/components/HomeStatsCard/HomeStatsCard';
import {selectDailyActivity} from '../../../features/game/slices/activity.slice';
import {initializeUserMarathonScore} from '../../../features/marathon/thunks/initialize-marathon-data-thunk';
import {fetchUserDailyActivity} from '../../../features/game/thunks/fetch-daily-activity';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<navigationType>();

  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser);
  const stories = useSelector(getAllStories);
  const todaysActivity = useSelector(selectDailyActivity);

  React.useEffect(() => {
    dispatch(getSubscriptionOfferings());
    dispatch(initializeUserMarathonScore());
    dispatch(fetchAllStories());
    dispatch(fetchUserDailyActivity());
  }, []);

  const checkSubscriptionStatus = () => {
    console.log('Clicked!');
  };

  // onPress={() => navigation.navigate('Login')}
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderSmall user={currentUser} />
      <HomeStatsCard
        calBurned={todaysActivity.caloriesBurned}
        bodyMovements={todaysActivity.bodyMoves}
      />
      {stories && (
        <StoryList
          stories={stories}
          triggerNavigate={checkSubscriptionStatus}
        />
      )}
    </Page>
  );
};
