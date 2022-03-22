import * as React from 'react';

import {BaseFont} from '../../components/Font/BaseFont';
import {Page} from '../../components/Page/Page';

export const WelcomeScreen = () => {
  return (
    <Page onPress={() => console.log('Tappable Screen!')}>
      <BaseFont variant="title">Welcome Screen</BaseFont>
      <BaseFont variant="small-caps">This is a subheading</BaseFont>
      <BaseFont variant="paragraph">This is a paragraph</BaseFont>
    </Page>
  );
};
