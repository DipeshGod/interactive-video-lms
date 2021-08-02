import { Container } from '@material-ui/core';
import React from 'react';
import TrackingBarChart from '../../components/courses/TrackingBarChart';
import Layout from '../../components/layout';

const Progress = () => {
  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <TrackingBarChart />
        </Container>
      </div>
    </Layout>
  );
};

export default Progress;
