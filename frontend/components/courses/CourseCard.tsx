import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Card,
  Typography,
  createStyles,
  Box,
  Button,
  Container,
  makeStyles,
  Theme,
  Chip,
} from '@material-ui/core';
import { Context as UserContext } from '../../context/user';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import enrollUserToCourse from '../../services/client/user/enrollUser';
import createUserProgress from '../../services/client/user/createUserProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '550px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginBottom: '2rem',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    courseTitle: {
      fontSize: '1.65rem',
    },
    learnMore: {
      marginRight: '1rem',
    },
  })
);

const CourseCard = ({
  name,
  description,
  price,
  id,
  isFree,
  hasPreTest,
  hasFinalTest,
}: any) => {
  const router = useRouter();
  const [raised, setRaised] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();

  const userEditMutation = useMutation((enrollInfo: any) =>
    enrollUserToCourse(enrollInfo)
  );
  const userProgressCreateMutation = useMutation((progressData: any) =>
    createUserProgress(progressData)
  );

  const handleStartCourse = () => {
    if (!state.user) {
      return router.push('/login');
    }
    userEditMutation.mutate(
      { courseId: id, userId: state.user._id },
      {
        onSuccess: (data) => {
          userProgressCreateMutation.mutate(
            { courseId: id, userId: state.user._id },
            {
              onSuccess: () => {
                console.log('started tracking');
              },
              onError: () => {
                console.log('error occurred when creating tracking');
              },
            }
          );
          toast.info('Erolled successfully');
          router.push('/dashboard');
        },
        onError: (err: any) => {
          console.log('err aayo', err.response);
          if (err.response.status === 403) {
            router.push(
              `/course/dashboard?id=${id}&pretest=${hasPreTest}&finaltest=${hasFinalTest}`
            );
          }
        },
      }
    );
  };

  return (
    <div>
      <Card raised={raised} className={classes.card}>
        <div
          style={{
            padding: '1rem 0',
          }}
        >
          <Container
            onMouseOver={() => setRaised(true)}
            onMouseLeave={() => setRaised(false)}
          >
            <Typography
              variant='h5'
              className={classes.courseTitle}
              gutterBottom
            >
              {name}
            </Typography>

            <Box marginTop='1rem'>
              <Typography variant='body1' style={{ fontSize: '1.2rem' }}>
                {description.substring(0, 200)}
              </Typography>
            </Box>
            <Box
              marginTop='2rem'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box>
                <Link href={`/course/${id}`}>
                  <Button variant='outlined' className={classes.learnMore}>
                    Details
                  </Button>
                </Link>
                {isFree ? (
                  <Button
                    onClick={handleStartCourse}
                    color='primary'
                    variant='contained'
                    disableElevation
                  >
                    Start Course
                  </Button>
                ) : (
                  <Button variant='outlined'>ENROLL NOW</Button>
                )}
              </Box>
              {isFree ? <Chip label='Free' /> : <Chip label={`Rs. ${price}`} />}
            </Box>
          </Container>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
