import * as React from 'react';
import {PageContainer, PageSafeAreaView} from './Page.styles';

interface Props {
  children: React.ReactNode;
}

export const Page: React.FC<Props> = ({children}) => {
  return (
    <PageSafeAreaView>
      <PageContainer>{children}</PageContainer>
    </PageSafeAreaView>
  );
};
