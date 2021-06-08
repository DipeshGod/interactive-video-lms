import { Box, Typography, Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CourseCard from '../courses/CourseCard';

const PopularCourses = () => {
  return (
    <Box paddingBottom='2rem'>
      <Typography variant='h4' align='center' gutterBottom>
        OUR COURSES
      </Typography>
      <Typography variant='h5' align='center'>
        Here are some of our popular courses
      </Typography>
      <Box
        marginTop='2rem'
        display='flex'
        flexWrap='wrap'
        justifyContent='space-between'
      >
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='primary'
          size='large'
          endIcon={<ArrowForwardIcon />}
        >
          View All Courses
        </Button>
      </Box>
    </Box>
  );
};

export default PopularCourses;
