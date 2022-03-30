import DEVICE_STORAGE from '../api/device-storage';

export const restoreCurrentUserFromStorage = async () => {
  const user = await DEVICE_STORAGE.GET_STORED_USER();
  return user ? user : null;
};
