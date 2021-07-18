import { Container, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import Layout from '../components/layout';
import getUserEnrolledCourse from '../services/client/user/getUserEnrolledCourse';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import EnrolledCourseCard from '../components/courses/EnrolledCourseCard';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem('user'))._id);
    setUserName(JSON.parse(localStorage.getItem('user')).name);
  }, []);

  const { isLoading, data } = useQuery(['user-courses', userId], () =>
    getUserEnrolledCourse(userId)
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
      <div key={enrolledCourse._id} style={{ margin: '2rem 0' }}>
        <EnrolledCourseCard
          id={enrolledCourse.courseId._id}
          name={enrolledCourse.courseId.name}
          category={enrolledCourse.courseId.category}
          progress={enrolledCourse.overallProgress}
          hasPreTest={enrolledCourse.courseId.hasPreTest}
          hasFinalTest={enrolledCourse.courseId.hasFinalTest}
        />
      </div>
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Typography align='center' variant='h5' gutterBottom>
            Welcome {userName}
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
