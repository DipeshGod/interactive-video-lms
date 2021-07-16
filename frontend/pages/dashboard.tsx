import { Container, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import Layout from '../components/layout';
import getUserEnrolledCourse from '../services/client/user/getUserEnrolledCourse';
import Loading from '../components/Loading';
import { useContext, useState } from 'react';
import EnrolledCourseCard from '../components/courses/EnrolledCourseCard';
import {Context as UserContext} from '../context/user'

const Dashboard = () => {
 
  const {state} = useContext(UserContext)

  if(!state.user) {
    return <Loading />;
  }


  const { isLoading, data } = useQuery(['user-courses', state.user._id], () =>
    getUserEnrolledCourse(state.user._id)
  );

  const showEnrolledCourses = (data) => {
    if (data.length === 0) {
      return (
        <Typography variant='h5'>
          Not enrolled in any course. Please check out our courses
        </Typography>
      );
    }
    return data.map((enrolledCourse) => (
      <div style={{ margin: '2rem 0' }}>
        <EnrolledCourseCard
          key={enrolledCourse._id}
          id={enrolledCourse._id}
          name={enrolledCourse.courseId.name}
          category={enrolledCourse.courseId.category}
          progress={enrolledCourse.overallProgress}
        />
      </div>
    ));
  };

  if (isLoading || !state.user) {
    return <Loading />;
  }



  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Typography align='center' variant='h5' gutterBottom>
            Welcome {state.user.name}
          </Typography>
          <Typography
            align='center'
            style={{ fontWeight: 'bold', margin: '1rem 0', fontSize: '1.5rem' }}
          >
            Enjoy learning with us !
          </Typography>
          <div>{showEnrolledCourses(data)}</div>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
