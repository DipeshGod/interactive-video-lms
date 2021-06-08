import {
  Avatar,
  Box,
  createStyles,
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
    name: 'Dipesh Chaulagain',
    role: 'Teacher (JavaScript Masters)',
    testimonial:
      'Lorem ipsum dolor sit amet, id eam munere recteque, per at ridens dictas. Te graecis scripserit cotidieque sed, vel labore praesent maluisset eu, mel nostrud intellegebat at. Ad mel epicurei voluptaria interesset, natum persius voluptatibus et nec, pri ubique animal dignissim et. Quodsi accusam sea cu. Prima probatus mnesarchum has ne.',
  },
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
      margin: '3rem auto',
      width: '60%',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '5px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: '1rem',
      },
    },
    avatar: {
      width: theme.spacing(22),
      height: theme.spacing(22),
      marginBottom: '1rem',
    },
  })
);

const Testimonials = () => {
  const classes = useStyles();

  return (
    <Box paddingBottom='2rem' paddingTop='3rem'>
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
            <Box display='flex' justifyContent='center'>
              <Avatar src='./images/dummy.jpg' className={classes.avatar} />
            </Box>
            <Typography gutterBottom variant='h5'>
              {testimonial.name}
            </Typography>
            <Typography gutterBottom variant='h6'>
              {testimonial.role}
            </Typography>
            <Typography variant='subtitle1' style={{ fontSize: '1.1rem' }}>
              {testimonial.testimonial}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
