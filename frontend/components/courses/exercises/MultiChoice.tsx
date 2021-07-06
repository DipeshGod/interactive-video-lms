import { useState, useEffect } from 'react';
import {
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Box,
  Chip,
  Button,
  makeStyles,
} from '@material-ui/core';
import _ from 'lodash';

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

const Multichoice = ({
  question,
  answer,
  options,
  score,
  setScore,
  changeQuestion,
}) => {
  const [value, setValue] = useState(new Array(options.length).fill(false));
  const classes = useStyles();

  useEffect(() => {
    setValue(new Array(options.length).fill(false));
  }, [changeQuestion]);

  const handleNextQuestion = () => {
    const userSelections = value
      .map((e, i) => {
        if (e === true) {
          return i;
        } else {
          return null;
        }
      })
      .splice(0, answer.length)
      .sort();

    let answers = answer.sort().map(Number);

    if (_.isEqual(answers, userSelections)) {
      setScore(score + 1);
    }
    changeQuestion();
  };

  const handleChange = (e) => {
    const index = e.target.value;
    let items = [...value];
    let item = items[index];
    item = !value[index];
    items[index] = item;
    setValue(items);
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
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox checked={value[i]} onChange={handleChange} value={i} />
            }
            label={option}
          />
        ))}
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

export default Multichoice;
