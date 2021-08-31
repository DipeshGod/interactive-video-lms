//theme of the app is defined here
import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#039be5',
    },
    secondary: {
      main: '#795548',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    fontSize: 16,
  },
});

export default theme;
