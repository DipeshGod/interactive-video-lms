import { useState } from 'react';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '550px',
      backgroundSize: 'cover',
      // background: `linear-gradient(to right, #c5796d, #603813)`,
      // color: 'white',
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

const CourseCard = ({ name, description, price, id, isFree }) => {
  const [raised, setRaised] = useState(false);
  const classes = useStyles();

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
                {description}
              </Typography>
            </Box>
            <Box
              marginTop='2rem'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box>
                <Link href={`/courses/${id}`}>
                  <Button variant='outlined' className={classes.learnMore}>
                    Details
                  </Button>
                </Link>
                {isFree ? (
                  <Button color='primary' variant='contained' disableElevation>
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
