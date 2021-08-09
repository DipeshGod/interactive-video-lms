import {
  Box,
  TextField,
  Typography,
  Container,
  InputBase,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',

      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '250px',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    addCourse: {
      backgroundColor: theme.palette.primary.dark,
      padding: '1rem',
    },
  })
);

const AddEnterprise = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Typography variant='h5' align='center'>
            Add New Enterprise User
          </Typography>
          <Box marginY='2rem'>
            <Box>
              <TextField
                fullWidth
                label='Enter enterprise name'
                variant='filled'
              />
            </Box>
            <Box marginTop='1rem'>
              <TextField
                fullWidth
                label='Enter enterprise description'
                variant='filled'
                multiline
              />
            </Box>
            <Box marginTop='1rem'>
              <Typography variant='overline' style={{ fontSize: '1.2rem' }}>
                Add Courses
              </Typography>
              <Box className={classes.addCourse}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Box>
            </Box>
            <Box style={{ marginTop: '1rem' }}>
              <Typography variant='overline' style={{ fontSize: '1.2rem' }}>
                Additional Features
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default AddEnterprise;
