import {
  Avatar,
  Box,
  ButtonGroup,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const testimonials = [
  {
    name: 'Trisham Basnet',
    role: 'Student (Psychology enroll)',
    testimonial:
      'Lorem ipsum dolor sit amet, id eam munere recteque, per at ridens dictas. Te graecis scripserit cotidieque sed, vel labore praesent maluisset eu, mel nostrud intellegebat at. Ad mel epicurei voluptaria interesset, natum persius voluptatibus et nec, pri ubique animal dignissim et. Quodsi accusam sea cu. Prima probatus mnesarchum has ne.',
  },
  {
    name: 'Jhon Doe',
    role: 'Founder (Student Assist)',
    testimonial:
      'No vim reque probatus. Et wisi suscipit luptatum has. Ut duo facete docendi commune. Tale animal complectitur pro et, an natum idque vel.No vim reque probatus. Et wisi suscipit luptatum has. Ut duo facete docendi commune. Tale animal complectitur pro et, an natum idque vel.',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    testimonial: {
      position: 'relative',
      margin: '3rem auto',
      width: '80%',
      padding: '0 2rem',
      textAlign: 'left',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: '1rem',
      },
    },
    testimonial_content: {
      flexBasis: '65%',
      [theme.breakpoints.down('xs')]: {
        flexBasis: '100%',
        marginTop: '1rem',
      },
    },
    avatar: {
      width: theme.spacing(22),
      height: theme.spacing(22),
      marginBottom: '1rem',
    },
    img: {
      flexBasis: '30%',
      backgroundSize: 'cover',
      backgroundPosition: 'left',
      backgroundRepeat: 'no-repeat',
      [theme.breakpoints.down('xs')]: {
        flexBasis: '100%',
        order: -1,
      },
    },
  })
);

const Testimonials = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography align='center' variant='h4'>
        YOU NEED TO EXPERIENCE THE BEST
      </Typography>
      <Carousel
        autoPlay={true}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        showThumbs={false}
        infiniteLoop
      >
        {testimonials.map((testimonial) => (
          <Box className={classes.testimonial} key={testimonial.name}>
            <Box className={classes.testimonial_content}>
              <Typography gutterBottom>{testimonial.testimonial}</Typography>
              <Box display='flex' alignItems='center'>
                <Typography
                  gutterBottom
                  style={{ marginRight: '10px', fontWeight: 'bold' }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  variant='caption'
                  style={{ fontWeight: 'bold' }}
                  color='textSecondary'
                  gutterBottom
                >
                  {testimonial.role}
                </Typography>
              </Box>
              <ButtonGroup
                color='secondary'
                variant='text'
                size='small'
                style={{ border: '1px solid orange', marginTop: '10px' }}
              >
                <IconButton>
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
            <Box className={classes.img}>
              <img src='/images/image-tanya.jpg' />
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
