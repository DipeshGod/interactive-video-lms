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
    bottom: '10px',
    width: '95%',
  },
  scoreQuestion: {
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      width: '280px',
    },
  },
}));

const Quiz = ({
  question,
  answer,
  options,
  score,
  setScore,
  changeQuestion,
}) => {
  const [value, setValue] = useState('Yes');
  const classes = useStyles();

  const handleNextQuestion = () => {
    if (value === options[answer]) {
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
        <RadioGroup name='quizOptions' value={value} onChange={handleChange}>
          {options.map((option, i) => (
            <FormControlLabel
              value={option}
              key={i}
              control={<Radio />}
              label={option}
            />
          ))}
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

export default Quiz;
