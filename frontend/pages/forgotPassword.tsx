import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CodeIcon from '@material-ui/icons/Code';
import Layout from '../components/layout';
import { toast } from 'react-toastify';
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
      marginTop: '1rem',
    },
  })
);

const ForgotPassword = () => {
  const classes = useStyles();
  const [hasCode, setHasCode] = useState(false);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter()

  const handleGetCode = async () => {
    if (email === undefined) {
      toast.warning('Please enter your email');
      return;
    }
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      if (response.status === 200) {
        toast.info('Please check your email');
        setHasCode(true);
      }
    } catch (err) {
      console.log('Couldnt get the code', err);
    }
  };

  const handleChangePassoword = async() => {
    if(password !== confirmPassword){
      toast.info("password doesnt match")
      return;
    }

    try{
      const response = await api.post('/api/auth/reset-password',{code,email,password});
      if(response.status===200){
        router.push('/login');
        toast.info("Password change success")
      }
    }catch(err) {
      console.log("error changing password",err)
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
            FORGOT PASSWORD ?
          </Typography>
          <Typography align='center' style={{ fontSize: '1.4rem' }}>
            Please Follow The Instructions 👋
          </Typography>
          <Box className={classes.card}>
            <Card raised>
              <CardContent>
                <Box marginY='1rem'>
                  <FormControl variant='filled' fullWidth={true}>
                    <InputLabel htmlFor='filled-adornment-email'>
                      Enter your email
                    </InputLabel>
                    <FilledInput
                      id='filled-adornment-email'
                      style={{ backgroundColor: '#efebe9' }}
                      type='email'
                      margin='dense'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <MailOutlineIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                {hasCode && (
                  <>
                    <Box marginY='1rem'>
                      <FormControl variant='filled' fullWidth={true}>
                        <InputLabel htmlFor='filled-adornment-code'>
                          Enter the verification code that you got in your
                          email.
                        </InputLabel>
                        <FilledInput
                          id='filled-adornment-code'
                          style={{ backgroundColor: '#efebe9' }}
                          type='password'
                          margin='dense'
                          name='code'
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          endAdornment={
                            <InputAdornment position='end'>
                              <CodeIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box marginY='1rem'>
                      <FormControl variant='filled' fullWidth={true}>
                        <InputLabel htmlFor='filled-adornment-password'>
                          New Password
                        </InputLabel>
                        <FilledInput
                          id='filled-adornment-password'
                          style={{ backgroundColor: '#efebe9' }}
                          type='password'
                          margin='dense'
                          name='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <LockOpenIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </>
                )}
                {hasCode ? (
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    onClick={handleChangePassoword}
                  >
                    Change Password
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    onClick={handleGetCode}
                  >
                    GET CODE
                  </Button>
                )}
                <Box className={classes.newAccount}>
                  <Link href='/login'>
                    <Button variant='outlined' color='primary'>
                      LOGIN?
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

export default ForgotPassword;
