import { Button, Container, Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import Layout from '../../components/layout';
import CourseIntro from '../../components/courses/CourseIntro';
import getCoursesById from '../../services/client/course/getCourseById';
import CourseReview from '../../components/courses/CourseReview';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';

const CourseDetails = () => {
  const router = useRouter();

  const { isLoading, data } = useQuery(['courses', router.query.slug], () =>
    getCoursesById(router.query.slug)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log('data', data);

  return (
    <Layout>
      <div style={{ padding: '3rem 0', minHeight: '80vh' }}>
        <Container>
          <CourseIntro course={data} />
          <Box marginTop='2rem'>
            <Button variant='contained' color='primary' size='large'>
              ENROLL NOW for Rs. {data.price}
            </Button>
          </Box>
          <CourseReview id={data._id} />
        </Container>
      </div>
    </Layout>
  );
};

export default CourseDetails;
