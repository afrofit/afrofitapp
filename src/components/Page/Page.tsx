import * as React from 'react';
import {BackgroundImage} from '../Elements/BackgroundImage';
import {Tappable} from '../Library/Tappable';
import {PageContainer, PageSafeAreaView, PageWrapper} from './Page.styles';

interface Props {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  onPress?: () => void;
}

export const Page: React.FC<Props> = ({
  children,
  padding = 20,
  disabled = true,
  onPress,
}) => {
  return (
    <PageWrapper>
      <PageSafeAreaView>
        <PageContainer padding={padding}>
          <Tappable onPress={onPress} disabled={disabled}>
            {children}
          </Tappable>
        </PageContainer>
      </PageSafeAreaView>
      <BackgroundImage />
    </PageWrapper>
  );
};
