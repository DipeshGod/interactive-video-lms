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
                <form>
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
                        Enter the verification code that you got in your email.
                      </InputLabel>
                      <FilledInput
                        id='filled-adornment-password'
                        style={{ backgroundColor: '#efebe9' }}
                        type='password'
                        margin='dense'
                        name='code'
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
                        endAdornment={
                          <InputAdornment position='end'>
                            <LockOpenIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <FormControl variant='filled' fullWidth={true}>
                    <InputLabel htmlFor='filled-adornment-password'>
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      id='filled-adornment-password'
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
                    GET CODE
                  </Button>
                </form>
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
