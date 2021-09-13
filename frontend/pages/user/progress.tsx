import {
  Box,
  Container,
  makeStyles,
  Theme,
  Typography,
  createStyles,
  Chip,
  IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import TrackingBarChart from '../../components/courses/TrackingBarChart';
import Layout from '../../components/layout';
import Loading from '../../components/Loading';
import getUserModuleProgress from '../../services/client/user/getUserModuleProgress';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    report: {
      backgroundColor: '#eec0c6',
      backgroundImage: 'linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)',
    },
  })
);

const ShowProgressReport = ({ courseProgress }) => {
  const classes = useStyles();

  let stats = [];

  courseProgress.moduleProgress.forEach((item) => {
    stats.push({
      x: item.module.title,
      y: item.solvedQuestions,
      goals: [
        {
          name: 'Expected',
          value: item.totalQuestions,
          strokeWidth: 5,
          strokeColor: '#775DD0',
        },
      ],
    });
  });

  return (
    <Box className={classes.report} paddingTop='1rem' marginBottom='2rem'>
      <Typography align='center' gutterBottom>
        {courseProgress.course.name}
      </Typography>
      <TrackingBarChart stats={stats} />
      <Box padding='1rem'>
        <Chip
          label={`Pretest ${courseProgress.preTest.score} %`}
          variant='default'
          color='primary'
        />
        <Chip
          label={`Final Test ${courseProgress.finalTest.score} %`}
          variant='default'
          style={{ backgroundColor: '#ffb300', marginLeft: '1rem' }}
        />
        <IconButton
          style={{ marginLeft: '5px' }}
          onClick={() => window.location.reload()}
        >
          <CachedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Progress = () => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem('user'))._id);
  }, []);

  const { isLoading, data } = useQuery(['progressReport', userId], () =>
    getUserModuleProgress(userId)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Typography
            variant='h5'
            align='center'
            style={{ marginBottom: '2rem' }}
          >
            Your Progress On Enrolled Courses
          </Typography>
          {data.map((item, i) => {
            return <ShowProgressReport key={i} courseProgress={item} />;
          })}
        </Container>
      </div>
    </Layout>
  );
};

export default Progress;
