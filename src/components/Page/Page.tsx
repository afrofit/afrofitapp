import * as React from 'react';
import {Tappable} from '../Library/Tappable';
import {PageContainer, PageSafeAreaView} from './Page.styles';

interface Props {
  children: React.ReactNode;
  padding?: number;
  tappable?: boolean;
  onPress?: () => void;
}

export const Page: React.FC<Props> = ({
  children,
  padding = 20,
  tappable = true,
  onPress,
}) => {
  return (
    <PageSafeAreaView>
      <PageContainer padding={padding}>
        <Tappable onPress={onPress} disabled={!tappable}>
          {children}
        </Tappable>
      </PageContainer>
    </PageSafeAreaView>
  );
};
