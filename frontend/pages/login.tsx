import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  Button,
  InputLabel,
  FilledInput,
  InputAdornment,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Layout from '../components/layout';
import { Context } from '../context/user';
import api from '../services/api';

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
      [theme.breakpoints.down('sm')]: {
        marginTop: '1rem',
      },
    },
  })
);

const Login = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    let loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const { data } = await api.post('/api/auth/login', loginData);
      dispatch({ type: 'LOGIN', payload: data });

      //save in localstorage to persist
      localStorage.setItem('user', JSON.stringify(data));

      //redirect
      router.push('/');
    } catch (err) {
      console.log('Couldnt login', err);
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const { data } = await api.post('/api/auth/google-login', {
        googleIdToken: res.tokenId,
      });
      dispatch({ type: 'LOGIN', payload: data });

      //save in localstorage to persist
      localStorage.setItem('user', JSON.stringify(data));

      //redirect
      router.push('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleFacebookLogin = async (res) => {
    const { userID, accessToken } = res;

    try {
      const { data } = await api.post('/api/auth/facebook-login', {
        userID,
        accessToken,
      });
      dispatch({ type: 'LOGIN', payload: data });

      //save in localstorage to persist
      localStorage.setItem('user', JSON.stringify(data));

      //redirect
      router.push('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Layout>
      <div
        style={{
          paddingTop: '2rem',
          minHeight: '80vh',
          backgroundImage: 'url("./images/login_back.svg")',
        }}
      >
        <Container>
          <Typography variant='h4' align='center' gutterBottom>
            LOGIN
          </Typography>
          <Typography align='center' style={{ fontSize: '1.4rem' }}>
            Please login to start learning and exploring with student assist
          </Typography>
          <Box className={classes.card}>
            <Card raised>
              <CardContent>
                <form onSubmit={handleLogin}>
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
                  <FormControl variant='filled' fullWidth={true}>
                    <InputLabel htmlFor='filled-adornment-password'>
                      Password (********)
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
                    <Link href='/forgotPassword'>
                      <Typography
                        style={{
                          marginTop: '5px',
                          padding: '5px',
                          cursor: 'pointer',
                        }}
                        variant='caption'
                      >
                        Forgot Password ?
                      </Typography>
                    </Link>
                  </FormControl>

                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{ marginTop: '0.5rem' }}
                    type='submit'
                  >
                    Login
                  </Button>
                </form>
                <Box
                  marginTop='1.2rem'
                  display='flex'
                  justifyContent='space-between'
                  flexWrap='wrap'
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <GoogleLogin
                      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                      buttonText='Google'
                      onSuccess={handleGoogleLogin}
                      onFailure={(e) => console.log('hello failure', e)}
                      cookiePolicy={'single_host_origin'}
                      render={(renderProps) => (
                        <Button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          variant='contained'
                          style={{ backgroundColor: '#ef5350', color: 'white' }}
                        >
                          Google Login
                        </Button>
                      )}
                    />
                    <FacebookLogin
                      appId={`${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}`}
                      autoLoad={false}
                      fields='name,email,picture'
                      callback={handleFacebookLogin}
                      size='medium'
                      render={(renderProps) => (
                        <Button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          variant='contained'
                          style={{
                            backgroundColor: '#4267B2',
                            color: 'white',
                            marginLeft: '1rem',
                          }}
                        >
                          Facebook Login
                        </Button>
                      )}
                    />
                  </Box>
                  <Box className={classes.newAccount}>
                    <Link href='/newAccount'>
                      <Button variant='outlined' color='primary'>
                        Create New Account
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
