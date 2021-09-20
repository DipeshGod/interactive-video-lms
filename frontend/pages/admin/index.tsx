import Link from 'next/link';
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
import EnterpriseAdminList from '../../components/admin/EnterpriseAdminList';
import getEnterprise from '../../services/client/enterprise/getEnterprise';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Admin = () => {
  const [showCreateNewCourse, setShowCreateNewCourse] = useState(false);

  const { data: courseData, isLoading: isCourseLoading } = useQuery(
    'courses',
    getCourses
  );

  const { data: enterpriseData, isLoading: isEnterpriseDataLoading } = useQuery(
    'enterprises',
    getEnterprise
  );

  if (isCourseLoading || isEnterpriseDataLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='flex-end'
            marginBottom='2rem'
          >
            <Button
              variant='contained'
              color='primary'
              disableElevation
              onClick={() => setShowCreateNewCourse(true)}
            >
              Create New Course
            </Button>
            <Link href='/admin/addEnterprise'>
              <Button
                variant='contained'
                style={{ marginLeft: '1rem' }}
                color='primary'
                disableElevation
              >
                Create New Enterprise
              </Button>
            </Link>
          </Box>
          <Box>
            <CourseAdminList courses={courseData} />
            <EnterpriseAdminList enterprises={enterpriseData} />
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
