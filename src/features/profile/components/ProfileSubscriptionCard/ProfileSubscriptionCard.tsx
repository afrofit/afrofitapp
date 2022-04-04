import * as React from 'react';
import {PurchaserInfo} from 'react-native-purchases';
import {BaseButton} from '../../../../components/Buttons/BaseButton';
import {ClearButton} from '../../../../components/Buttons/ClearButton';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import Spacer from '../../../../components/Library/Spacer';
import {theme} from '../../../../theme/theme';
import {SubscriptionCardContainer} from './ProfileSubscriptionCard.styles';
import {ExpandedPurchasesEntitlementInfoType} from './types';

interface Props {
  onTapSubscribe: () => void;
  onCancelSubscription: () => void;
  onRestoreSubscription: () => void;
  info?: PurchaserInfo | null;
}

const ProfileSubscriptionCard: React.FC<Props> = ({
  onTapSubscribe,
  onCancelSubscription,
  onRestoreSubscription,
  info,
}) => {
  const [activeSubscription, setActiveSubscription] =
    React.useState<ExpandedPurchasesEntitlementInfoType | null>(null);

  React.useEffect(() => {
    info && parsePurchaserInformation(info);
  }, [info]);

  const parsePurchaserInformation = (purchaserInfo: PurchaserInfo) => {
    const activeSubscription: ExpandedPurchasesEntitlementInfoType =
      purchaserInfo?.entitlements?.active?.premium;

    if (activeSubscription) {
      return setActiveSubscription(activeSubscription);
    }
    return setActiveSubscription(null);
  };

  const parseSubscriptionEndDate = (date: string) => {
    return new Date(date).toDateString();
  };

  return (
    <>
      <BaseCard color={theme.COLORS.bronze}>
        <BaseFont variant="small-caps" color={theme.COLORS.darker}>
          Your Subscription
        </BaseFont>
        <Spacer />
        <SubscriptionCardContainer>
          {info && activeSubscription && activeSubscription.isActive && (
            <>
              <BaseFont variant="paragraph">
                Your{' '}
                {activeSubscription.ownershipType === 'PURCHASED'
                  ? 'Premium'
                  : 'Trial'}{' '}
                subscription ends on
              </BaseFont>
              <Spacer h={10} />
              {activeSubscription.expirationDate && (
                <BaseFont variant="number-large">
                  {parseSubscriptionEndDate(activeSubscription.expirationDate)}
                </BaseFont>
              )}
              <Spacer />
              <BaseButton
                text="Cancel Subscription"
                onPress={() => onCancelSubscription()}
              />
            </>
          )}

          {!info && (
            <>
              <BaseFont variant="paragraph">You're not subscribed.</BaseFont>
              <Spacer />
              <BaseButton text="Subscribe Now" onPress={onTapSubscribe} />
              {/* <Spacer /> */}
            </>
          )}
        </SubscriptionCardContainer>
      </BaseCard>
      {!info && (
        <>
          <ClearButton
            text="Restore existing subscription"
            onPress={() => onRestoreSubscription()}
            variant="yellow"
          />
          <Spacer h={10} />
        </>
      )}
    </>
  );
};

export default ProfileSubscriptionCard;
