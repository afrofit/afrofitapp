import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import Purchases, {PurchasesOfferings} from 'react-native-purchases';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthStackParamList} from '../../../navigator/AuthNavigator';
import {BaseButton} from '../../../components/Buttons/BaseButton';
import {Page} from '../../../components/Page/Page';
import {BaseFont} from '../../../components/Font/BaseFont';

type navigationType = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {}

export const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<navigationType>();

  const [offer, setOffer] = React.useState<any>(null);

  const fetchSubscriptionOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
      }
      console.log('Offerings', offerings);
      setOffer(offerings.current);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchSubscriptionOfferings();
  }, []);

  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Home Screen</BaseFont>
      <BaseFont variant="small-caps">This is a good subheading</BaseFont>
      <BaseFont variant="paragraph">This is a paragraph</BaseFont>

      <BaseButton
        onPress={() => navigation.navigate('Login')}
        text="Continue"
        variant="red"
      />
    </Page>
  );
};
