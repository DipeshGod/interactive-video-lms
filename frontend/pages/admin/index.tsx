import {
  Container,
  Box,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CreateNewCourse from '../../components/admin/CreateNewCourse';
import CourseAdminList from '../../components/admin/CourseAdminList';
import Layout from '../../components/layout';
import Loading from '../../components/Loading';
import getCourses from '../../services/client/course/getCourses';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Admin = () => {
  const [showCreateNewCourse, setShowCreateNewCourse] = useState(false);

  const { data: courseData, isLoading: isCourseLoading } = useQuery(
    'courses',
    getCourses
  );

  if (isCourseLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Box display='flex' justifyContent='flex-end' marginBottom='2rem'>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              onClick={() => setShowCreateNewCourse(true)}
            >
              Create New Course
            </Button>
          </Box>
          <Box>
            <CourseAdminList courses={courseData} />
          </Box>
        </Container>
        {
          <CreateNewCourse
            showCreateNewCourse={showCreateNewCourse}
            setShowCreateNewCourse={setShowCreateNewCourse}
          />
        }
      </div>
    </Layout>
  );
};

export default Admin;
