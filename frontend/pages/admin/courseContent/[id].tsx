import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Container,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import getCoursesById from '../../../services/client/course/getCourseById';

import CreateNewModule from '../../../components/admin/CreateNewModule';
import CourseContent from '../../../components/courses/CourseContent';
import { useState } from 'react';
import editCourseInfo from '../../../services/client/course/editCourseInfo';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: '1rem',
      },
    },
  })
);

const ManageCourseContent = ({ id }) => {
  const classes = useStyles();
  const [showCreateNewModule, setShowCreateNewModule] = useState(false);

  const { isLoading, data: course } = useQuery(['course', id], () =>
    getCoursesById(id)
  );

  const queryClient = useQueryClient();
  const coursePretestEditMutation = useMutation((course: any) =>
    editCourseInfo({ hasPreTest: !course.hasPreTest }, course._id)
  );
  const courseFinaltestEditMutation = useMutation((course: any) =>
    editCourseInfo({ hasFinalTest: !course.hasFinalTest }, course._id)
  );

  const handlePretestStatusChange = () => {
    coursePretestEditMutation.mutate(course, {
      onSuccess: () => {
        queryClient.invalidateQueries(['course', id]);
        toast.success(`pretest status changed`);
      },
      onError: (error: any) => {
        toast.error('Something went wrong');
      },
    });
  };

  const handleFinaltestStatusChange = () => {
    courseFinaltestEditMutation.mutate(course, {
      onSuccess: () => {
        queryClient.invalidateQueries(['course', id]);
        toast.success(`pretest status changed`);
      },
      onError: (error: any) => {
        toast.error('Something went wrong');
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '75vh' }}>
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
                onClick={handlePretestStatusChange}
              >
                Disable Pretest
              </Button>
            ) : (
              <Button
                onClick={handlePretestStatusChange}
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
            {course.hasFinalTest === true ? (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
                onClick={handleFinaltestStatusChange}
              >
                Disable FinalTest
              </Button>
            ) : (
              <Button
                className={classes.btn}
                variant='contained'
                color='secondary'
                onClick={handleFinaltestStatusChange}
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
  return {
    props: {
      id: params.id,
    },
  };
}

export default ManageCourseContent;
