import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Container, Button, Box } from '@material-ui/core';
import Layout from '../../../components/layout';
import getCoursesById from '../../../services/server/course/getCourseById';
import CourseIntro from '../../../components/courses/CourseIntro';
import CreateNewModule from '../../../components/admin/CreateNewModule';
import CourseContent from '../../../components/courses/CourseContent';
import { useState } from 'react';

const ManageCourseContent = ({ course }) => {
  const [showCreateNewModule, setShowCreateNewModule] = useState(false);

  return (
    <Layout>
      <div style={{ paddingTop: '2rem' }}>
        <Container>
          <CourseIntro course={course} />
          <Box marginY='2rem'>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setShowCreateNewModule(true)}
            >
              Add A module
            </Button>
          </Box>
          <Box>
            <CourseContent />
          </Box>
        </Container>
        {showCreateNewModule && (
          <CreateNewModule
            showCreateNewModule={showCreateNewModule}
            setShowCreateNewModule={setShowCreateNewModule}
          />
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('courses', () => getCoursesById(params.id));

  return {
    props: {
      course: dehydrate(queryClient).queries[0].state.data,
    },
  };
}

export default ManageCourseContent;
