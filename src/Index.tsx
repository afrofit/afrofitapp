import 'react-native-gesture-handler';

import * as React from 'react';
import Purchases from 'react-native-purchases';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IOS_REVCAT_KEY, ANDROID_REVCAT_KEY} from 'react-native-dotenv';
import {AbsoluteLoader} from './components/Loaders/AbsoluteLoader/AbsoluteLoader';
import {
  selectShowGenericErrorDialog,
  selectUiIsLoading,
} from './features/ui/ui.slice';
import {
  getCurrentUser,
  setCurrentUser,
  unsetCurrentUser,
} from './features/auth/user.slice';
import {restoreCurrentUserFromStorage} from './utils/restore-user';
import useAsyncEffect from 'use-async-effect';
import VerifyUserNavigator from './navigator/VerifyUserNavigator';
import {AbsoluteErrorMessage} from './components/ErrorMessage/AbsoluteErrorMessage/AbsoluteErrorMessage';
import {logoutUserThunk} from './features/auth/logout-user-thunk';
import GameNavigator from './navigator/GameNavigator';

export const Index = () => {
  const dispatch = useDispatch();

  /**Selectors */
  const isLoading = useSelector(selectUiIsLoading);
  const isError = useSelector(selectShowGenericErrorDialog);
  const currentUserFromStore = useSelector(getCurrentUser);

  React.useEffect(() => {
    Purchases.setDebugLogsEnabled(true);

    if (Platform.OS === 'ios') {
      Purchases.setup(IOS_REVCAT_KEY);
    } else if (Platform.OS === 'android') {
      Purchases.setup(ANDROID_REVCAT_KEY);
    }
  }, []);

  useAsyncEffect(async () => {
    const currentUser = await restoreCurrentUserFromStorage();

    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
    } else if (!currentUser) {
      dispatch(unsetCurrentUser());
    }
  }, [dispatch]);

  // dispatch(logoutUserThunk());

  return (
    <>
      <AbsoluteErrorMessage error={isError} />
      <AbsoluteLoader visible={isLoading} />
      {currentUserFromStore &&
      currentUserFromStore.isRegistered &&
      !currentUserFromStore.isVerified ? (
        <VerifyUserNavigator />
      ) : currentUserFromStore && currentUserFromStore.isVerified ? (
        <GameNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

// {currentUserFromStore && currentUserFromStore.isVerified && (
//   <AppNavigator />
// )}
// {currentUserFromStore &&
//   currentUserFromStore.isRegistered &&
//   !currentUserFromStore.isVerified && <VerifyEmailNavigator />}
// {!currentUserFromStore && <AuthNavigator />}
