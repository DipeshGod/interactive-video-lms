import Link from 'next/link';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      backgroundColor: 'white',
      padding: '1rem 4rem',
      [theme.breakpoints.down('xs')]: {
        padding: '1rem',
      },
    },
    bannerIntro: {
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
    bannerImg: {
      minHeight: '80vh',
      backgroundImage: "url('/images/banner.png')",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
  })
);

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-between'
      >
        <Box flexBasis='45%' className={classes.bannerIntro}>
          <Typography variant='h3' gutterBottom>
            Online learning platform for the future
          </Typography>
          <Typography style={{ fontSize: '1.2rem' }} gutterBottom>
            Modern education platform empowered by qualtity contents and
            technology asissted learning
          </Typography>
          <Link href='/courses'>
            <Button
              style={{ marginTop: '1rem' }}
              variant='outlined'
              size='large'
              color='primary'
            >
              Our Courses
            </Button>
          </Link>
        </Box>
        <Box flexBasis='55%' className={classes.bannerImg}>
          <p style={{ display: 'none' }}>just some stuff</p>
        </Box>
      </Box>
    </div>
  );
};

export default Banner;
