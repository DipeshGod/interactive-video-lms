import {
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  ListItemIcon,
} from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VideoPlayer from '../videoPlayer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  })
);

const CourseIntro = ({ course }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h4' gutterBottom>
        {course.name}
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        {course.description}
      </Typography>
      <Divider />
      <Box marginTop='2rem'>
        <VideoPlayer
          poster={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${course.coursePoster}`}
          videoSources={course.introductoryVideo}
          videoTitle={''}
        />
      </Box>
      <Box marginTop='2rem'>
        <Card elevation={1} className={classes.card}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              FEATURES
            </Typography>
            <List disablePadding dense>
              <ListItem>
                <ListItemIcon>
                  <VideoLibraryIcon color='error' />
                </ListItemIcon>
                <ListItemText
                  primary={course.features[0]}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color='error' />
                </ListItemIcon>
                <ListItemText
                  primary={course.features[1]}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon color='error' />
                </ListItemIcon>
                <ListItemText
                  primary={course.features[2]}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box marginTop='2rem'>
        <Card elevation={1} className={classes.card}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              GOALS
            </Typography>
            <List disablePadding dense>
              {course.goals.map((goal) => (
                <ListItem key={goal}>
                  <ListItemIcon>
                    <SportsSoccerIcon color='error' />
                  </ListItemIcon>
                  <ListItemText
                    primary={goal}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box marginTop='2rem'>
        <Card elevation={1} className={classes.card}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              INSTRUCTORS
            </Typography>
            <List disablePadding dense>
              {course.instructors.map((instructor) => (
                <ListItem key={instructor}>
                  <ListItemIcon>
                    <RecordVoiceOverIcon color='error' />
                  </ListItemIcon>
                  <ListItemText
                    primary={instructor}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CourseIntro;
