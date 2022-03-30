import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import {User} from '../models/User';

const KEY = 'AUTH_KEY';
const RESET_KEY = 'AUTH_RESET_KEY';

const STORE_TOKEN = async (token: string) => {
  try {
    await SecureStore.setItemAsync(KEY, token);
  } catch (error) {
    console.error('Error storing AUTH_TOKEN!', error);
  }
};

const GET_TOKEN = async () => {
  try {
    return await SecureStore.getItemAsync(KEY);
  } catch (error) {
    console.error('Error fetching AUTH_TOKEN!', error);
  }
};

const GET_STORED_USER = async () => {
  const token = await GET_TOKEN();
  if (token) {
    const user: User = jwtDecode(token);
    return user;
  }
  return null;
};

const REMOVE_TOKEN = async () => {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch (error) {
    console.error('Error Removing AUTH_TOKEN!');
  }
};

/** Reset Token Flow */

const GET_RESET_TOKEN = async () => {
  try {
    return await SecureStore.getItemAsync(RESET_KEY);
  } catch (error) {
    console.error('Error fetching AUTH_RESET_TOKEN!', error);
  }
};

const STORE_RESET_TOKEN = async (token: string) => {
  try {
    SecureStore.setItemAsync(RESET_KEY, token);
  } catch (error) {
    console.error('Error storing AUTH_RESET_TOKEN!', error);
  }
};

const REMOVE_RESET_TOKEN = async () => {
  try {
    await SecureStore.deleteItemAsync(RESET_KEY);
  } catch (error) {
    console.error('Error removing AUTH_RESET_TOKEN!');
  }
};

export default {
  STORE_TOKEN,
  GET_TOKEN,
  GET_STORED_USER,
  REMOVE_TOKEN,
  GET_RESET_TOKEN,
  STORE_RESET_TOKEN,
  REMOVE_RESET_TOKEN,
};
