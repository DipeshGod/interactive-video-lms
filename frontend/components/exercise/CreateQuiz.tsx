import { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';

const CreateQuiz = () => {
  const [answer, setAnswer] = useState(0);
  const [quizOptions, setQuizOptions] = useState([]);

  const handleOptionInput = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setQuizOptions([...quizOptions, e.target.value]);
      e.target.value = '';
    }
  };

  const handleAnswerSelect = (e) => {
    setAnswer(Number(e.target.name));
  };

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Create a Quiz
      </Typography>
      <Box marginY='1rem'>
        <Box marginY='1rem'>
          <TextField label='Enter the question' variant='outlined' fullWidth />
        </Box>
        <Box marginY='1rem'>
          <TextField
            label='Enter a option and press enter to create another'
            variant='outlined'
            onKeyUp={handleOptionInput}
            fullWidth
          />
        </Box>
        <RadioGroup value={answer} onChange={handleAnswerSelect}>
          {quizOptions.map((option, i) => (
            <FormControlLabel
              key={i}
              name={`${i}`}
              value={i}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        <Button
          style={{ marginTop: '1rem' }}
          variant='outlined'
          color='primary'
        >
          Create Quiz
        </Button>
      </Box>
    </>
  );
};

export default CreateQuiz;
