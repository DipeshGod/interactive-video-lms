import Link from 'next/link';
import {
  Typography,
  Backdrop,
  Container,
  makeStyles,
  Button,
  Theme,
  Box,
  createStyles,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      height: '90vh',
      backgroundImage: 'url("./images/back.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      color: '#fff',
      width: '100%',
      height: '90vh',
      position: 'static',
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '4rem',
      padding: '0 10rem',
      [theme.breakpoints.down('xs')]: {
        padding: '0 1rem',
      },
    },
  })
);

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Backdrop open={true} className={classes.backdrop}>
        <Container className={classes.content}>
          <Typography variant='h4' align='center' gutterBottom>
            LEARN TOP QUALITY COURSES WHICH WILL SET YOUR CAREER APART
          </Typography>
          <Typography
            style={{ fontSize: '1.4rem', marginBottom: '2rem' }}
            align='center'
            variant='subtitle1'
          >
            Practicality of things you learn is what defines success. Here, you
            will get to learn from industry expert lecturers so that you are
            ready to apply it in the real world !
          </Typography>
          <Box margin='auto'>
            <Button
              color='primary'
              variant='contained'
              size='large'
              startIcon={<MenuBookIcon color='secondary' />}
            >
              <Link href='/courses'>Explore Our Courses</Link>
            </Button>
          </Box>
        </Container>
      </Backdrop>
    </div>
  );
};

export default Banner;
