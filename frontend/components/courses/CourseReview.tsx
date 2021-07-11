import {
  Card,
  CardContent,
  Avatar,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import getCourseReview from '../../services/client/course/getCourseReview';
import Loading from '../Loading';
import CreateReview from './CreateReview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '50%',
      marginTop: '2rem',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginRight: '1rem',
    },
  })
);

const CourseReview = () => {
  const classes = useStyles();
  const router = useRouter();
  const courseId = router.query.slug;

  const { data, isLoading } = useQuery(['review', courseId], () =>
    getCourseReview(courseId)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ marginTop: '2rem' }}>
        <CreateReview />
      </div>
      <div className={classes.container}>
        {data.map((review) => (
          <Card
            style={{ marginTop: '1rem' }}
            variant='outlined'
            key={review._id}
          >
            <CardContent>
              <Box display='flex' alignItems='center'>
                <Avatar
                  alt={review.user.name}
                  src={review.user.profilePicture}
                  className={classes.large}
                />
                <Box display='flex' flexDirection='column'>
                  <Typography variant='h6'>{review.user.name}</Typography>
                  <Typography variant='overline'>{review.user.type}</Typography>
                  <Rating
                    name='rating'
                    precision={0.5}
                    defaultValue={review.rating}
                    readOnly
                  />
                </Box>
              </Box>
              <Box marginTop='1rem'>
                <Typography>{review.comment}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseReview;
