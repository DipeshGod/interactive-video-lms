import { Typography, Container, Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import CourseCard from '../../components/courses/CourseCard';
import Layout from '../../components/layout';
import Loading from '../../components/Loading';
import getCourses from '../../services/client/course/getCourses';

const Courses = () => {
  const { isLoading, data } = useQuery(['courses'], () => getCourses());

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Box>
            <Typography align='center' variant='h4' gutterBottom>
              OUR COURSES
            </Typography>
            <Typography align='center' variant='h5' gutterBottom>
              Here are the courses we currenly offer. More to come !
            </Typography>
          </Box>
          <Box marginY='3rem'>
            {data.map((course) => (
              <CourseCard
                name={course.name}
                description={course.description}
                price={course.price}
                id={course._id}
                isFree={course.isFree}
                key={course._id}
              />
            ))}
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Courses;
