import { Container, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import Layout from '../components/layout';
import getUserEnrolledCourse from '../services/client/user/getUserEnrolledCourse';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import EnrolledCourseCard from '../components/courses/EnrolledCourseCard';

const Dashboard = () => {
  const [id, setId] = useState();

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem('user'))._id);
  }, []);

  const { isLoading, data } = useQuery(['user-courses', id], () =>
    getUserEnrolledCourse(id)
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
      <EnrolledCourseCard key={enrolledCourse._id} id={enrolledCourse._id} />
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>{showEnrolledCourses(data.enrolledCourse)}</Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
