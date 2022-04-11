import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AntDesign} from '@expo/vector-icons';

import {HomeScreen} from '../screens/game/Home/Home.Screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {theme} from '../theme/theme';
import {MarathonScreen} from '../screens/game/Marathon/Marathon.Screen';
import {ProfileScreen} from '../screens/game/Profile/Profile.Screen';
import {StoryIntroScreen} from '../screens/dance/StoryIntroScreen';
import {StorySummaryModel} from '../types/types';

export type GameStackParamList = {
  GameRoot: undefined;
  StoryScreen: undefined;
  StoryIntroScreen: StorySummaryModel;
  ChapterScreen: undefined;
  DanceScreen: undefined;
  ResultsScreen: undefined;
  StoryFinish: undefined;
};

export type GameScreensStackParamList = {
  Home: undefined;
  Marathon: undefined;
  Profile: undefined;
};

const ICON_SIZE = 30;

const {Screen: TabScreen, Navigator: TabNavigator} =
  createBottomTabNavigator<GameScreensStackParamList>();
const {Screen, Navigator} = createStackNavigator<GameStackParamList>();

const GameNavigatorTabs = () => (
  <TabNavigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.COLORS.yellow,
      tabBarStyle: {
        backgroundColor: theme.COLORS.black,
        borderColor: theme.COLORS.black,
      },
    }}>
    <TabScreen
      name={'Home'}
      component={HomeScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="home" color={color} size={ICON_SIZE} />
        ),
      }}
    />
    <TabScreen
      name={'Marathon'}
      component={MarathonScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="Trophy" color={color} size={ICON_SIZE} />
        ),
      }}
    />
    <TabScreen
      name={'Profile'}
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <AntDesign name="user" color={color} size={ICON_SIZE} />
        ),
      }}
    />
  </TabNavigator>
);

const GameNavigator = () => (
  <Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
    <Screen name={'GameRoot'} component={GameNavigatorTabs} />
    <Screen name={'StoryIntroScreen'} component={StoryIntroScreen} />
  </Navigator>
);

export default GameNavigator;
