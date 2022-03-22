import * as React from 'react';
import {Button} from 'react-native';

import {BaseFont} from '../../components/Font/BaseFont';
import {Page} from '../../components/Page/Page';

interface Props {
  something?: string;
}

export const WelcomeScreen: React.FC<Props> = () => {
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Welcome Screen</BaseFont>
      <BaseFont variant="small-caps">This is a good subheading</BaseFont>
      <BaseFont variant="paragraph">This is a paragraph</BaseFont>
      <Button title="what a button" />
    </Page>
  );
};
