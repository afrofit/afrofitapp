import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {BaseButton} from '../../../components/Buttons/BaseButton';
import {Page} from '../../../components/Page/Page';
import {
  GameScreensStackParamList,
  GameStackParamList,
} from '../../../navigator/GameNavigator';
import PageHeaderLarge from '../../../components/Headers/PageHeaderLarge/PageHeaderLarge';
import {StyleSheet} from 'react-native';
import Spacer from '../../../components/Library/Spacer';
import {ProfileScreenScroller} from './Profile.Screen.styles';
import {BaseFont} from '../../../components/Font/BaseFont';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUserThunk} from '../../../features/auth/logout-user-thunk';
import {getCurrentUser} from '../../../features/auth/user.slice';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const {id: userId, username, email, joinDate, rankId} = currentUser;

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <PageHeaderLarge title="Profile" />
      <ProfileScreenScroller
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* <ProfileNameCard
							username={username}
							email={email}
							joinDateInMillis={joinDate}
							onTapUsername={() => setEditingUsername(true)}
							rankId={rankId}
						/> */}
        {/* <ProfileStatsCard
							calBurned={formatStatsNumbers(totalCaloriesBurned)}
							bodyMoves={formatStatsNumbers(totalBodyMoves, true)}
							hoursDanced={hours}
							daysActive={totalDaysActive}
						/>
						<ProfileSubscriptionCard
							subscription={subscription}
							info={purchaseInfo}
							onCancelSubscription={handleCancelSubscription}
							onRestoreSubscription={handleRestoreSubscription}
							onTapSubscribe={() => dispatch(setShowSubscribeDialog(true))}
						/> */}
        <BaseButton onPress={handleLogout} text="Logout" variant="red" />
      </ProfileScreenScroller>
      <Spacer h={10} />
      <BaseFont variant="id-text">USER ID: {userId}</BaseFont>
    </Page>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
