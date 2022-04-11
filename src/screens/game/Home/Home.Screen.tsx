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
import {checkSubscriptionStatus} from '../../../features/subscription/utils/check-subscription-status';
import {
  selectShowSubscribeDialog,
  showSubscribeDialog,
} from '../../../features/ui/ui.slice';
import {SubscriptionModal} from '../../../components/Modal/SubscriptionModal/SubscriptionModal';
import {createSubscription} from '../../../features/subscription/thunks/create-subscription-thunk';
import {PurchasesPackage} from 'react-native-purchases';
import {StorySummaryModel} from '../../../types/types';

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
  const showDialog = useSelector(selectShowSubscribeDialog);

  React.useEffect(() => {
    dispatch(getSubscriptionOfferings());
    dispatch(initializeUserMarathonScore());
    dispatch(fetchAllStories());
    dispatch(fetchUserDailyActivity());
  }, []);

  const handleCreateSubscription = (pack: PurchasesPackage) => {
    dispatch(createSubscription(pack));
  };

  const goToStory = async (storySummary: StorySummaryModel) => {
    const {contentStoryId, introVideo, instruction, completed, started, title} =
      storySummary;
    console.log('Clicked!');
    // const result = await checkSubscriptionStatus();
    // if (!result) {
    //   return dispatch(showSubscribeDialog(true));
    // }
    return navigation.navigate('StoryIntroScreen', {
      contentStoryId,
      introVideo,
      completed,
      started,
      instruction,
      title,
    });
  };

  return (
    <>
      {showDialog && (
        <SubscriptionModal
          handleCreateSubscription={handleCreateSubscription}
          onDismiss={() => dispatch(showSubscribeDialog(false))}
        />
      )}
      <Page onPress={() => console.log('Tappable Screen!')}>
        <PageHeaderSmall user={currentUser} />
        <HomeStatsCard
          calBurned={todaysActivity.caloriesBurned}
          bodyMovements={todaysActivity.bodyMoves}
        />
        {stories && <StoryList stories={stories} triggerNavigate={goToStory} />}
      </Page>
    </>
  );
};
