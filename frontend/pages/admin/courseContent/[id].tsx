import Link from 'next/link';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  Container,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import getCoursesById from '../../../services/server/course/getCourseById';

import CreateNewModule from '../../../components/admin/CreateNewModule';
import CourseContent from '../../../components/courses/CourseContent';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: '1rem',
      },
    },
  })
);

const ManageCourseContent = ({ course, id }) => {
  const classes = useStyles();
  const [showCreateNewModule, setShowCreateNewModule] = useState(false);

  console.log('course', course);

  return (
    <Layout>
      <div style={{ paddingTop: '2rem' }}>
        <Container>
          <Box
            marginY='2rem'
            display='flex'
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Button
              color='primary'
              variant='contained'
              onClick={() => setShowCreateNewModule(true)}
              className={classes.btn}
            >
              Add A module
            </Button>
            <Link
              href={`/admin/courseContent/manageTest?id=${id}&category=preTest`}
            >
              <Button
                className={classes.btn}
                color='primary'
                variant='contained'
              >
                Add Pre Test
              </Button>
            </Link>
            {course.hasPreTest === true ? (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
              >
                Disable Pretest
              </Button>
            ) : (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
              >
                Enable Pretest
              </Button>
            )}

            <Link
              href={`/admin/courseContent/manageTest?id=${id}&category=finalTest`}
            >
              <Button
                className={classes.btn}
                color='primary'
                variant='contained'
              >
                Add Final Test
              </Button>
            </Link>
            {course.hasPreTest === true ? (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
              >
                Disable FinalTest
              </Button>
            ) : (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
              >
                Enable FinalTest
              </Button>
            )}
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

  await queryClient.prefetchQuery(['course', params.id], () =>
    getCoursesById(params.id)
  );

  return {
    props: {
      course: dehydrate(queryClient).queries[0].state.data,
      id: params.id,
    },
  };
}

export default ManageCourseContent;
