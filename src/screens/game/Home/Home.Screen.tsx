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

  React.useEffect(() => {
    dispatch(getSubscriptionOfferings());
    dispatch(fetchAllStories());
  }, []);

  const checkSubscriptionStatus = () => {
    console.log('Clicked!');
  };

  // onPress={() => navigation.navigate('Login')}
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderSmall user={currentUser} />
      <HomeStatsCard calBurned={100} bodyMovements={606} />
      <StoryList stories={stories} triggerNavigate={checkSubscriptionStatus} />
    </Page>
  );
};
