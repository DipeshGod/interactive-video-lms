import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  createStyles,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '50vw',
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    chapterNumber: {
      flexBasis: '40%',
    },
    progress: {
      flexBasis: '50%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        marginTop: '1rem',
      },
    },
  })
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.secondary.main,
    },
  })
)(LinearProgress);

const EnrolledCourseCard = ({
  id,
  name,
  category,
  progress,
  hasPreTest,
  hasFinalTest,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box display='flex' justifyContent='space-between'>
        <Box
          padding='1rem'
          display='flex'
          flexDirection='column'
          justifyContent='space-evenly'
          flexBasis='35%'
          style={{ backgroundColor: '#1976d2', color: 'white' }}
        >
          <Typography
            variant='overline'
            style={{ fontWeight: 'bold' }}
            color='textSecondary'
            gutterBottom
          >
            {category}
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 'bold' }} gutterBottom>
            {name}
          </Typography>
        </Box>
        <Box padding='10px 1rem' flexBasis='65%'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='1rem'
            flexWrap='wrap'
          >
            <Typography className={classes.chapterNumber}>Chapter 4</Typography>
            <Box className={classes.progress}>
              <BorderLinearProgress variant='determinate' value={progress} />
            </Box>
          </Box>
          <Box marginBottom='1.5rem'>
            <Typography>Chapter Name</Typography>
          </Box>
          <Box marginBottom='1rem' display='flex' justifyContent='flex-end'>
            <Link
              href={`/course/dashboard?id=${id}&pretest=${hasPreTest}&finaltest=${hasFinalTest}`}
            >
              <Button
                variant='contained'
                color='primary'
                style={{ borderRadius: '1rem' }}
              >
                Continue
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default EnrolledCourseCard;
