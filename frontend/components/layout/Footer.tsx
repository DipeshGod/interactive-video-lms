import Link from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Box,
  Container,
  Typography,
  Link as NLink,
  Divider,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
  return (
    <Box
      style={{ backgroundColor: 'black', color: '#fafafa', padding: '2rem 0' }}
    >
      <Container>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>About Us</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>Be A Instructor</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>Courses for Enterprise</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>Careers</a>
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
                <a>Featured Courses</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>Apply for Scholarship</a>
              </Link>
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ fontSize: '1.3rem' }}
            >
              <Link href='/'>
                <a>Contact Us</a>
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
        <Box marginTop='1.5rem'>
          <Box display='flex' justifyContent='center'>
            <Typography style={{ marginRight: '1.5rem' }}>
              Product of Blusheep Tech
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
