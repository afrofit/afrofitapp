import * as React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {theme} from '../../theme/theme';
import {BackgroundImage} from '../Elements/BackgroundImage';
import {Tappable} from '../Library/Tappable';
import {PageContainer, PageSafeAreaView, PageWrapper} from './Page.styles';

interface Props {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  onPress?: () => void;
  image?: number;
}

type BgVarType = {
  [key: number]: number;
};

const backgroundVariants: BgVarType = {
  1: require('../../assets/images/art/male_model_blurdark.png'),
  2: require('../../assets/images/art/welcome-background.png'),
};

export const PageImaged: React.FC<Props> = ({
  children,
  padding = 20,
  disabled = true,
  image = 2,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Tappable onPress={onPress} disabled={disabled}>
        <ImageBackground
          source={backgroundVariants[image]}
          resizeMode="cover"
          style={styles.image}>
          <SafeAreaView style={styles.view}>{children}</SafeAreaView>
        </ImageBackground>
      </Tappable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.95,
    padding: 20,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
