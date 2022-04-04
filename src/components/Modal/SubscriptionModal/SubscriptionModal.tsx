import * as React from 'react';
import Purchases, {
  PACKAGE_TYPE,
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';
import {BaseButton} from '../../Buttons/BaseButton';
import {ClearButton} from '../../Buttons/ClearButton';
import {ImageElement} from '../../Elements/ImageElement';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {Modal} from '../Modal';
import {ButtonColorOptions, PackageTypeReturnString} from './types';

interface Props {
  onDismiss: () => void;
  handleCreateSubscription: (pack: PurchasesPackage) => void;
}

export const SubscriptionModal: React.FC<Props> = ({
  onDismiss,
  handleCreateSubscription,
}) => {
  const content =
    'Start with a 7-day trial and continue with one of the options below';

  const [offer, setOffer] = React.useState<PurchasesOffering | null>(null);

  const fetchSubscriptionOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        //Display current offering with offerings.current
        return setOffer(offerings.current);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchSubscriptionOfferings();
  }, []);

  const getPackageTypeString = (
    type: PACKAGE_TYPE,
  ): PackageTypeReturnString => {
    if (type === 'MONTHLY') return 'monthly';
    else if (type === 'SIX_MONTH') return 'half-yearly';
    else if (type === 'ANNUAL') return 'yearly';
    return 'trial';
  };

  return (
    <Modal title="Subscription Options">
      <ImageElement
        size={175}
        source={require('../../../assets/images/art/model_male_01.png')}
      />
      <BaseFont variant="paragraph">{content}</BaseFont>
      <Spacer h={20} />
      {offer &&
        offer.availablePackages.map((pack, index) => {
          const packageType = getPackageTypeString(pack.packageType);
          return (
            <BaseButton
              key={pack.identifier}
              text={`${pack.product.price_string} / ${packageType}`}
              onPress={() => handleCreateSubscription(pack)}
              variant={ButtonColorOptions[index + 1]}
            />
          );
        })}
      <ClearButton text="Maybe Later" variant="gray" onPress={onDismiss} />
    </Modal>
  );
};
