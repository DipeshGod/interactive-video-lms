import { useState } from 'react';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Box,
  Chip,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btns: {
    position: 'absolute',
    width: '95%',
    bottom: '10px',
  },
  scoreQuestion: {
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      width: '280px',
    },
  },
}));

const YesNo = ({ question, answer, score, setScore, changeQuestion }) => {
  const [value, setValue] = useState();
  const classes = useStyles();

  const handleNextQuestion = () => {
    if (answer === 'true' && value === 'Yes') {
      setScore(score + 1);
    }
    if (answer == 'false' && value === 'No') {
      setScore(score + 1);
    }
    changeQuestion();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className={classes.scoreQuestion}
      >
        <Typography variant='h6' gutterBottom>
          {question}
        </Typography>
        <Chip color='primary' label={`Score: ${score}`} />
      </Box>
      <FormControl component='fieldset'>
        <RadioGroup name='yesNo' value={value} onChange={handleChange}>
          <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='No' control={<Radio />} label='No' />
        </RadioGroup>
      </FormControl>
      <div className={classes.btns}>
        <Button
          size='small'
          color='primary'
          variant='outlined'
          onClick={handleNextQuestion}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default YesNo;
