import { useState } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import CourseContent from '../../../components/courses/CourseContent';
import CourseReview from '../../../components/courses/CourseReview';
import TrackingBarChart from '../../../components/courses/TrackingBarChart';
import Layout from '../../../components/layout';
import Exercises from '../../../components/courses/exercises';
import { useQuery } from 'react-query';
import getCourseContent from '../../../services/client/course/getCourseContent';

const CourseDashboard = () => {
  const router = useRouter();

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const { pretest, finaltest } = router.query;

  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Box marginTop='7rem'>
            <TrackingBarChart />
          </Box>
          {pretest === 'true' && (
            <Box marginBottom='3rem' marginTop='3rem'>
              <Button
                style={{ width: '300px' }}
                variant='contained'
                color='primary'
                size='large'
                disableElevation
              >
                Pretest
              </Button>
              <Box marginTop='10px'>
                <Typography variant='caption' color='textSecondary'>
                  Take pretest to know for your course eligibility
                </Typography>
              </Box>
            </Box>
          )}

          <CourseContent />
          {finaltest === 'true' && (
            <Box marginBottom='5rem'>
              <Button
                style={{ width: '300px' }}
                variant='contained'
                color='primary'
                size='large'
                disabled
              >
                Final Test
              </Button>
              <Box marginTop='10px'>
                <Typography variant='caption' color='textSecondary'>
                  You need to complete 80% of the module exercises before you
                  can take final test
                </Typography>
              </Box>
            </Box>
          )}
          <Box marginBottom='3rem'>
            <CourseReview id={router.query.id} />
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default CourseDashboard;
