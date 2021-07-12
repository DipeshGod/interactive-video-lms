import Link from 'next/link';
import { Box, Typography, Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useQuery } from 'react-query';
import getCourses from '../../services/client/course/getCourses';
import CourseCard from '../courses/CourseCard';
import Loading from '../Loading';

const PopularCourses = () => {
  const { isLoading, data } = useQuery('courses', () => getCourses());

  if (isLoading) {
    return <Loading />;
  }

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
        {data.map((course) => (
          <CourseCard
            key={course._id}
            id={course._id}
            name={course.name}
            description={course.description}
            price={course.price}
            isFree={course.isFree}
          />
        ))}
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Link href='/course'>
          <Button
            variant='contained'
            color='primary'
            size='large'
            endIcon={<ArrowForwardIcon />}
          >
            View All Courses
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PopularCourses;
