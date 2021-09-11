import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../../components/layout';
import Loading from '../../../components/Loading';
import getExerciseById from '../../../services/client/exercise/getExerciseById';

const Test = () => {
  const router = useRouter();
  const course = router.query.course;
  const [page, setPage] = useState(1);

  const { isLoading, data, isPreviousData } = useQuery(
    ['finaltest', course, page],
    () => getExerciseById(course, 'finalTest', page, 5),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <Layout>
      <div
        style={{ marginTop: '6rem', marginBottom: '3rem', minHeight: '75vh' }}
      >
        <Container>
          <Typography variant='h5' align='center' gutterBottom>
            FINAL TEST
          </Typography>
          <Typography align='center'>
            Answer questions carefully. Wish you all the best !
          </Typography>
          <Box marginTop='3rem' minHeight='50vh'>
            {data.exercises.map((item, i) => (
              <Grid key={i} container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {item.question}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>

          <Box>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={() => {
                if (page < data.totalPages) {
                  setPage(page + 1);
                }
              }}
              disabled={isPreviousData || page >= data.totalPages}
            >
              Next
            </Button>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Test;
