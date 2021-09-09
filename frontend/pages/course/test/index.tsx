import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Layout from '../../../components/layout';
import Loading from '../../../components/Loading';
import getExerciseById from '../../../services/client/exercise/getExerciseById';

const Test = () => {
  const router = useRouter();
  const course = router.query.course;

  const { isLoading, data } = useQuery(['finaltest', course], () =>
    getExerciseById(course, 'finalTest')
  );

  if (isLoading) {
    return <Loading />;
  }

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
          <Box marginTop='3rem'>
            {data.map((item, i) => (
              <Grid key={i} container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {item.question}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Test;
