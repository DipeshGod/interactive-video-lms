import {
  Box,
  TextField,
  Typography,
  Container,
  InputBase,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useQuery } from 'react-query';
import getUserByEmail from '../../services/client/user/getUserByEmail';
import { toast } from 'react-toastify';

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

  const [email, setEmail] = useState('');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [enterpriseDescription, setEnterpriseDescription] = useState('');
  const [enterPriseAdmin, setEnterpriseAdmin] = useState('');
  const [courses, setCourses] = useState([]);

  const { isLoading, data, refetch } = useQuery(
    ['userByEmail'],
    () => getUserByEmail(email),
    {
      enabled: false,
    }
  );

  const handleEmailChange = (e) => {
    if (e.keyCode === 13) {
      refetch();
      if (data && !data.verified) {
        toast.error('User not found');
        setEmail('');
        return;
      }

      toast.info('User added');
      setEnterpriseAdmin(data._id);
    }
  };

  const handleCreateEnterprise = () => {
    console.log(enterpriseName, enterpriseDescription);
  };

  console.log(enterPriseAdmin);

  return (
    <Layout>
      <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
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
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
              />
            </Box>
            <Box marginTop='1rem'>
              <TextField
                fullWidth
                label='Enter enterprise description'
                variant='filled'
                multiline
                value={enterpriseDescription}
                onChange={(e) => setEnterpriseDescription(e.target.value)}
              />
            </Box>
            <Box marginTop='1rem'>
              <Typography variant='overline' style={{ fontSize: '1.2rem' }}>
                Add Enterprise Admin
              </Typography>
              <Box className={classes.addCourse}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search email…'
                    onKeyUp={handleEmailChange}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                {enterPriseAdmin && (
                  <Typography
                    style={{ marginTop: '1rem' }}
                    color='textSecondary'
                  >
                    {email}
                  </Typography>
                )}
              </Box>
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
                    placeholder='Search course…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Box>
            </Box>

            <Button
              variant='outlined'
              color='primary'
              style={{ marginTop: '2rem' }}
              size='large'
              onClick={handleCreateEnterprise}
            >
              Create Enterprise
            </Button>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default AddEnterprise;
