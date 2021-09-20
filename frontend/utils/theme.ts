//theme of the app is defined here
import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: {
      main: '#795548',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    fontSize: 16,
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;
