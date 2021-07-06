import { Typography } from '@material-ui/core';

const Result = ({ score, total }) => {
  return (
    <div>
      <Typography variant='h5' gutterBottom>
        You have completed the quiz.
      </Typography>
      <Typography variant='h6'>
        You got {score}/{total} right.
      </Typography>
    </div>
  );
};

export default Result;
