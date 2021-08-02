import Link from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Box,
  Container,
  Typography,
  Link as NLink,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
  return (
    <Box
      style={{ backgroundColor: 'black', color: '#fafafa', padding: '2rem 0' }}
    >
      <Container>
        <Grid container alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              CONNECT
            </Typography>

            <NLink
              href='https://www.facebook.com/blusheeptech'
              target='blank'
              style={{ marginRight: '10px', color: '#4267B2' }}
            >
              <FacebookIcon />
            </NLink>

            <NLink
              href='https://www.instagram.com/blusheeptech/'
              style={{ color: '#cd486b' }}
              target='blank'
            >
              <InstagramIcon />
            </NLink>

            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>ABOUT US</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>CONTACT</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>APPLY FOR SCHOLARSHIP</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>CAREERS</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>BE AN INSTRUCTOR</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>COURSES FOR ENTERPRISE</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>FAQ</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Image src='/images/logo.jpg' width='250px' height='250px' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
