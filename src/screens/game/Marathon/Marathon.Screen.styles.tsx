import * as React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const ScrollerElement = styled.ScrollView`
  max-height: 100%;
  width: 100%;
`;

export const MarathonScroller: React.FC = ({children}) => {
  return (
    <ScrollerElement
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {children}
    </ScrollerElement>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
