import { useState, useEffect } from 'react';

import { Box, Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import CourseContent from '../../../components/courses/CourseContent';
import CourseReview from '../../../components/courses/CourseReview';
import TrackingBarChart from '../../../components/courses/TrackingBarChart';
import Layout from '../../../components/layout';
import Exercises from '../../../components/courses/exercises';
import { useQuery } from 'react-query';
import getExerciseById from '../../../services/client/exercise/getExerciseById';
import getUserCourseProgress from '../../../services/client/user/getUserCourseProgress';
import Loading from '../../../components/Loading';

const CourseDashboard = () => {
  const router = useRouter();

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const { pretest, finaltest } = router.query;

  const { isLoading: isPretestLoading, data: coursePretest } = useQuery(
    ['pretest', router.query.id],
    () => getExerciseById(router.query.id, 'preTest')
  );

  const { isLoading: isProgressLoading, data: progressData } = useQuery(
    ['progress', router.query.id],
    () =>
      getUserCourseProgress(
        router.query.id,
        JSON.parse(localStorage.getItem('user'))._id
      )
  );

  if (isProgressLoading) {
    return <Loading />;
  }

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
                onClick={() => setIsQuizOpen(true)}
              >
                Pretest
              </Button>
              <Box marginTop='10px'>
                <Typography variant='caption' color='textSecondary'>
                  Take pretest to know for your course eligibility
                </Typography>
                {
                  <Typography
                    color='textSecondary'
                    style={{ marginTop: '10px' }}
                  >
                    You have scored {progressData.preTestScore.score} % in
                    pretest
                  </Typography>
                }
              </Box>
              {isQuizOpen && (
                <Exercises
                  exerciseLoading={isPretestLoading}
                  exercises={coursePretest}
                  isQuizOpen={isQuizOpen}
                  setIsQuizOpen={setIsQuizOpen}
                />
              )}
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
