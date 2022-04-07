import {create, Request} from 'apisauce';

import DEVICE_STORAGE from './device-storage';
import APP_SETTINGS from '../config/app-settings';

const API_CLIENT = create({
  baseURL: APP_SETTINGS.apiUrl,
  timeout: 10000,
  timeoutErrorMessage: 'Network Error',
});

API_CLIENT.addAsyncRequestTransform(async (request: Request) => {
  const authToken = await DEVICE_STORAGE.GET_TOKEN();
  if (!authToken) return;
  request.headers['x-auth-token'] = authToken;
});

API_CLIENT.addAsyncRequestTransform(async (request: Request) => {
  const authResetToken = await DEVICE_STORAGE.GET_RESET_TOKEN();
  if (!authResetToken) return;
  request.headers['x-auth-reset-token'] = authResetToken;
});

export default API_CLIENT;
