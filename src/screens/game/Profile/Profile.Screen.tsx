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
import ProfileNameCard from '../../../features/profile/components/ProfileNameCard/ProfileNameCard';
import {ProfileStatsCard} from '../../../features/profile/components/ProfileStatsCard/ProfileStatsCard';
import {formatStatsNumbers} from '../../../utils/formatters';
import ProfileSubscriptionCard from '../../../features/profile/components/ProfileSubscriptionCard/ProfileSubscriptionCard';
import {
  selectShowSubscribeDialog,
  showSubscribeDialog,
} from '../../../features/ui/ui.slice';
import Purchases, {PurchaserInfo} from 'react-native-purchases';
import {SubscriptionModal} from '../../../components/Modal/SubscriptionModal/SubscriptionModal';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const showDialog = useSelector(selectShowSubscribeDialog);

  const [editingUsername, setEditingUsername] = React.useState(false);
  const [purchaseInfo, setPurchaseInfo] = React.useState<PurchaserInfo | null>(
    null,
  );

  const {id: userId, username, email, joinDate, rankId} = currentUser!;

  /**Purchase Flow */
  React.useEffect(() => {
    getPurchaserInfo();

    Purchases.addPurchaserInfoUpdateListener(info => getPurchaserInfo());
  }, []);

  const getPurchaserInfo = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();

      if (typeof purchaserInfo.entitlements.active.premium !== 'undefined') {
        setPurchaseInfo(purchaserInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const handleCancelSubscription = () => {};
  const handleRestoreSubscription = () => {};
  const handleCreateSubscription = () => {};

  return (
    <>
      {showDialog && (
        <SubscriptionModal
          handleCreateSubscription={handleCreateSubscription}
          onDismiss={() => dispatch(showSubscribeDialog(false))}
        />
      )}
      <Page onPress={() => console.log('Tappable Screen!')}>
        <PageHeaderLarge title="Profile" />
        <ProfileScreenScroller
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <ProfileNameCard
            username={username}
            email={email}
            joinDate={joinDate}
            onTapUsername={() => setEditingUsername(true)}
            rankId={rankId}
          />
          <ProfileStatsCard
            calBurned={formatStatsNumbers(10992)}
            bodyMoves={formatStatsNumbers(129912, true)}
            hoursDanced={1}
            daysActive={1}
          />
          <ProfileSubscriptionCard
            info={purchaseInfo}
            onCancelSubscription={handleCancelSubscription}
            onRestoreSubscription={handleRestoreSubscription}
            onTapSubscribe={() => dispatch(showSubscribeDialog(true))}
          />
          <BaseButton onPress={handleLogout} text="Logout" variant="red" />
        </ProfileScreenScroller>
        <Spacer h={10} />
        <BaseFont variant="id-text">USER ID: {userId}</BaseFont>
      </Page>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
