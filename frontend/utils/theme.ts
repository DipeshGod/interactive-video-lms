//theme of the app is defined here
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
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
