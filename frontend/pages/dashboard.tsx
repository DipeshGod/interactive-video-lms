import { Container, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import Layout from '../components/layout';
import getUserEnrolledCourse from '../services/client/user/getUserEnrolledCourse';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import EnrolledCourseCard from '../components/courses/EnrolledCourseCard';

const Dashboard = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem('user'))._id);
    setName(JSON.parse(localStorage.getItem('user')).name);
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
    return data.map(({ _id, name, category }) => (
      <div style={{ margin: '2rem 0' }}>
        <EnrolledCourseCard
          key={_id}
          id={_id}
          name={name}
          category={category}
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
            Welcome {name}
          </Typography>
          <Typography
            align='center'
            style={{ fontWeight: 'bold', margin: '1rem 0', fontSize: '1.5rem' }}
          >
            Enjoy learning with us !
          </Typography>
          <div>{showEnrolledCourses(data.enrolledCourse)}</div>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
