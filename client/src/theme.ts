import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#ffffff',
              paper: '#f5f5f5',
            },
            text: {
              primary: '#213547',
            },
          }
        : {
            background: {
              default: '#242424',
              paper: '#1a1a1a',
            },
            text: {
              primary: 'rgba(255, 255, 255, 0.87)',
            },
          }),
    },
  });
};
