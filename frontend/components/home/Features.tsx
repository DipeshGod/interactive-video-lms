import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: '2rem',
  },
});

const features = [
  {
    title: 'High Quality Lectures',
    description:
      'We have high quality lectures where domian experts teach you the most effective way. Our lectures are well structured alongside with its course materials.',
    image: '/images/feature1.jpg',
  },
  {
    title: 'Get Help Easily',
    description:
      'When you start learning through any courses we offer, the instructors are always avilable to help. We have question answer section in every courses.',
    image: '/images/feature2.jpg',
  },
  {
    title: 'Assignments',
    description:
      'We have well orgranized assignments for you to practice. These assignments online based. You can also have your assignments verifed by the instructors.',
    image: '/images/feature3.jpg',
  },
  {
    title: 'Interactive Quizes',
    description:
      'Our courses contain interactive quizes for you to see your progress. These are very fun and brainstroming for you to understand things more clearly.',
    image: '/images/feature4.jpg',
  },
  {
    title: 'Track Your Progress',
    description:
      'Track your progress and your go through the course. We have excercises,quizes and assignments for your to validate what you have learnt.',
    image: '/images/feature5.jpg',
  },
  {
    title: 'Get More For Less',
    description:
      'Our courses are priced well. We make sure you get the best education for the price you can easily afford.',
    image: '/images/feature6.jpg',
  },
];

const Features = () => {
  const classes = useStyles();

  const showFeatureCards = () => {
    return features.map((feature, i) => (
      <Card className={classes.root} key={i} elevation={0}>
        <CardActionArea>
          <CardMedia>
            <Image
              src={feature.image}
              alt={feature.title}
              width='345'
              height='200'
              objectFit='cover'
            />
          </CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              color='primary'
            >
              {feature.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {feature.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  };

  return (
    <Box padding='3rem 0'>
      <Typography align='center' variant='h4' gutterBottom>
        WHY LEARN HERE ?
      </Typography>
      <Typography align='center' variant='h5'>
        We provide the learning experience you deserve.
      </Typography>
      <Box
        marginTop='1rem'
        display='flex'
        flexWrap='wrap'
        justifyContent='space-between'
      >
        {showFeatureCards()}
      </Box>
    </Box>
  );
};

export default Features;
