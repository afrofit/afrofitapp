const settings = {
  dev: {
    // apiUrl: 'http://192.168.1.102:4040/api',
    apiUrl: 'http://192.168.1.108:4040/api',
  },
  prod: {
    apiUrl: 'https://afrofir-server-x537a.ondigitalocean.app/api',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.prod;
};

export default getCurrentSettings();
