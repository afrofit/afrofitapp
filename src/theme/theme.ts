import {Dimensions} from 'react-native';

export const theme = {
  COLORS: {
    white: '#F3F0F9',
    black: '#151313',
    dark: '#2e2d2d',
    darker: '#201f1f',
    yellow: '#E48D29',
    bronze: '#775335',
    red: '#CD203A',
    green: '#3C820F',
    gray_100: '#F5F5F7',
    gray_200: '#D0D2DA',
    gray_300: '#92959E',
    gray_400: '#666666',
    gray_500: '#4f4f4f',
  },
  BORDER_RADIUS: {
    lg: '50px',
    md: '20px',
    sm: '10px',
  },
  MARGIN: {
    sm: '10px',
    lg: '20px',
  },
  DEVICE_DIMENSIONS: {
    width: `${Dimensions.get('window').width}px`,
    height: `${Dimensions.get('window').height}px`,
  },
};
