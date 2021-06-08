import Image from 'next/image';
import { Box, Button, Typography } from '@material-ui/core';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';

const FindInstructor = () => {
  return (
    <Box
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
      marginTop='1rem'
      paddingTop='2rem'
      paddingX='2rem'
    >
      <Typography variant='h4' align='center' gutterBottom>
        ARE YOU A INSPIRING INSTRUCTOR ?
      </Typography>
      <Typography style={{ fontSize: '1.1rem' }} align='center' gutterBottom>
        If your are someone who is passionate about teaching, you are welcome to
        our platform to be inspiring instructor. The qualification is expertise
        in any domain and skill to present idea clearly. If your idea and
        knowlowdge is worth sharing, maybe it be music, social science,
        photography or anything which can bring value to learners, you are
        welcome to be part of us.
      </Typography>
      <Box paddingY='2rem' display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='primary'
          endIcon={<CastForEducationIcon />}
          size='large'
        >
          BE A INSTRUCTOR
        </Button>
      </Box>
    </Box>
  );
};

export default FindInstructor;
