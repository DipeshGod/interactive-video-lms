import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent,
  Button,
  FilledInput,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Layout from '../components/layout';
import api from '../services/api';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: '3rem auto',
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    newAccount: {
      marginTop: '1rem',
    },
  })
);

const NewAccount = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleCreateNewAccount = async (e) => {
    e.preventDefault();
    let newAccountData = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
    };

    try {
      const response = await api.post('/api/auth/register', newAccountData);
      if (response.status === 200) {
        toast.info('Please check your email to login');
        router.push('/');
      }
    } catch (err) {
      console.log('couldnt create new user', err);
    }
  };

  return (
    <Layout>
      <div
        style={{
          paddingTop: '2rem',
          minHeight: '100vh',
          backgroundImage: 'url("./images/login_back.svg")',
        }}
      >
        <Container>
          <Typography variant='h4' align='center' gutterBottom>
            CREATE NEW ACCOUNT
          </Typography>
          <Typography align='center' style={{ fontSize: '1.4rem' }}>
            Please signup to expolore the possibility with student assist
          </Typography>
          <Box className={classes.card}>
            <Card raised>
              <CardContent>
                <form onSubmit={handleCreateNewAccount}>
                  <Box marginY='1rem'>
                    <FormControl variant='filled' fullWidth={true}>
                      <InputLabel htmlFor='filled-adornment-name'>
                        Fullname ( john doe )
                      </InputLabel>
                      <FilledInput
                        id='filled-adornment-name'
                        style={{ backgroundColor: '#efebe9' }}
                        type='text'
                        margin='dense'
                        name='name'
                        endAdornment={
                          <InputAdornment position='end'>
                            <PersonIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box marginY='1rem'>
                    <FormControl variant='filled' fullWidth={true}>
                      <InputLabel htmlFor='filled-adornment-email'>
                        Email ( johndoe@example.com )
                      </InputLabel>
                      <FilledInput
                        id='filled-adornment-email'
                        style={{ backgroundColor: '#efebe9' }}
                        type='email'
                        margin='dense'
                        name='email'
                        endAdornment={
                          <InputAdornment position='end'>
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box marginY='1rem'>
                    <FormControl variant='filled' fullWidth={true}>
                      <InputLabel htmlFor='filled-adornment-password'>
                        Password
                      </InputLabel>
                      <FilledInput
                        id='filled-adornment-password'
                        style={{ backgroundColor: '#efebe9' }}
                        type='password'
                        margin='dense'
                        name='password'
                        endAdornment={
                          <InputAdornment position='end'>
                            <LockOpenIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <FormControl variant='filled' fullWidth={true}>
                    <InputLabel htmlFor='filled-adornment-confirmPassword'>
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      id='filled-adornment-confirmPassword'
                      style={{ backgroundColor: '#efebe9' }}
                      type='password'
                      margin='dense'
                      name='confirmPassword'
                      endAdornment={
                        <InputAdornment position='end'>
                          <LockOpenIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    type='submit'
                  >
                    CREATE NEW ACCOUNT
                  </Button>
                </form>
                <Box className={classes.newAccount}>
                  <Link href='/login'>
                    <Button variant='outlined' color='primary'>
                      ALLREADY HAVE A ACCOUNT?
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default NewAccount;
