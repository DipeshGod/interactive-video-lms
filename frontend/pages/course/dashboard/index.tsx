import { Container, Typography } from '@material-ui/core';
import React from 'react';
import CourseContent from '../../../components/courses/CourseContent';
import Layout from '../../../components/layout';

const CourseDashboard = () => {
  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Typography variant='h6' gutterBottom>
            This is student progress bar chart
          </Typography>
          <Typography variant='h6' gutterBottom>
            This is where pre-test section
          </Typography>
          <CourseContent />
          <Typography variant='h6' gutterBottom>
            This is where final-test section
          </Typography>
          <Typography variant='h6' gutterBottom>
            This is where stundets can leave course review
          </Typography>
        </Container>
      </div>
    </Layout>
  );
};

export default CourseDashboard;
