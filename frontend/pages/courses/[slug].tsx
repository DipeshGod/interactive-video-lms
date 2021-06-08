import { Button, Container, Box } from '@material-ui/core';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Layout from '../../components/layout';
import CourseIntro from '../../components/courses/CourseIntro';
import getCoursesById from '../../services/server/course/getCourseById';

const CourseDetails = ({ course }) => {
  return (
    <Layout>
      <div style={{ padding: '3rem 0', minHeight: '80vh' }}>
        <Container>
          <CourseIntro course={course} />
          <Box marginTop='2rem'>
            <Button variant='contained' color='primary' size='large'>
              ENROLL NOW for Rs. {course.price}
            </Button>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['course', params.slug], () =>
    getCoursesById(params.slug)
  );

  return {
    props: {
      course: dehydrate(queryClient).queries[0].state.data,
    },
  };
}

export default CourseDetails;
