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
import {
  ProfileScreenContainer,
  ProfileScreenScroller,
} from './Profile.Screen.styles';
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
import Purchases, {
  PurchaserInfo,
  PurchasesPackage,
} from 'react-native-purchases';
import {SubscriptionModal} from '../../../components/Modal/SubscriptionModal/SubscriptionModal';
import {createSubscription} from '../../../features/subscription/thunks/create-subscription-thunk';
import {Filter} from '../../../features/profile/components/Filter/Filter';
import {ProfilePagesEnum} from '../../../features/profile/types';
import {selectPerformanceData} from '../../../features/game/slices/activity.slice';

type navigationType = StackNavigationProp<
  GameStackParamList & GameScreensStackParamList,
  'Home'
>;

interface Props {}

export const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const showDialog = useSelector(selectShowSubscribeDialog);
  const totalUserStats = useSelector(selectPerformanceData);

  const [editingUsername, setEditingUsername] = React.useState(false);
  const [purchaseInfo, setPurchaseInfo] = React.useState<PurchaserInfo | null>(
    null,
  );
  const [currentPage, setCurrentPage] = React.useState<ProfilePagesEnum>(
    ProfilePagesEnum.you,
  );

  const {id: userId, username, email, joinDate, rankId} = currentUser!;

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
  const handleCreateSubscription = (pack: PurchasesPackage) => {
    dispatch(createSubscription(pack));
  };

  const handlePageSwitch = (page: ProfilePagesEnum) => {
    setCurrentPage(page);
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
        <PageHeaderLarge title="Profile" />
        <Filter currentPage={currentPage} onSwitchPage={handlePageSwitch} />
        <ProfileScreenContainer>
          {currentPage === ProfilePagesEnum.you && (
            <ProfileNameCard
              username={username}
              email={email}
              joinDate={joinDate}
              onChangeUsername={() => setEditingUsername(true)}
              rankId={rankId}
            />
          )}
          {currentPage === ProfilePagesEnum.stats && (
            <ProfileStatsCard stats={totalUserStats} />
          )}
          {currentPage === ProfilePagesEnum.subscription && (
            <ProfileSubscriptionCard
              info={purchaseInfo}
              onCancelSubscription={handleCancelSubscription}
              onRestoreSubscription={handleRestoreSubscription}
              onTapSubscribe={() => dispatch(showSubscribeDialog(true))}
            />
          )}
        </ProfileScreenContainer>
        <BaseButton onPress={handleLogout} text="Logout" variant="red" />
        <Spacer h={10} />
        <BaseFont variant="id-text">USER ID: {userId}</BaseFont>
        <Spacer />
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
