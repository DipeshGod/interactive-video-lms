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

const CourseCard = ({ name, description, price, id }) => {
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
              INTRODUCTION TO MICROECONOMICS
            </Typography>
            <Typography
              gutterBottom
              variant='overline'
              style={{ fontSize: '0.9rem' }}
            >
              Learn why small choices make huge impacts
            </Typography>
            <Box marginTop='1rem'>
              <Typography variant='body1' style={{ fontSize: '1.2rem' }}>
                Microeconomics is a branch of economics that studies the
                behavior of individuals and firms in making decisions regarding
                the allocation of scarce resources and the interactions among
                these individuals and firms...
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
                    LEARN MORE
                  </Button>
                </Link>
                <Button variant='outlined'>ENROLL NOW</Button>
              </Box>
              <Chip label='Rs. 3000' />
            </Box>
          </Container>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
