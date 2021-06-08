import {
  Container,
  Box,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { useState } from 'react';
import CreateNewCourse from '../../components/admin/CreateNewCourse';
import CourseAdminList from '../../components/admin/CourseAdminList';
import Layout from '../../components/layout';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Admin = () => {
  const [showCreateNewCourse, setShowCreateNewCourse] = useState(false);

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
            <CourseAdminList />
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
