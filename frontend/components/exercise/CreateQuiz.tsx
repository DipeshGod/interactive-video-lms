import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';
import { useMutation, useQueryClient } from 'react-query';
import createExercise from '../../services/client/exercise/createExercise';

const CreateQuiz = () => {
  const [answer, setAnswer] = useState(0);
  const [question, setQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  const courseExerciseMutation = useMutation((exercise: any) =>
    createExercise(exercise, id)
  );

  const handleOptionInput = (e) => {
    if (e.keyCode === 13) {
      setQuizOptions([...quizOptions, e.target.value]);
      e.target.value = '';
    }
  };

  const handleAnswerSelect = (e) => {
    setAnswer(Number(e.target.name));
  };

  const handleQuizSubmit = () => {
    let exercise = {
      question,
      options: quizOptions,
      answer: [answer],
      type: 'quiz',
    };
    courseExerciseMutation.mutate(exercise, {
      onSuccess: () => {
        console.log('maza aayo hai');
      },
      onError: () => {
        console.log('err aayo hai');
      },
    });
  };

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Create a Quiz
      </Typography>
      <Box marginY='1rem'>
        <Box marginY='1rem'>
          <TextField
            label='Enter the question'
            variant='outlined'
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
          />
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
          onClick={handleQuizSubmit}
        >
          Create Quiz
        </Button>
      </Box>
    </>
  );
};

export default CreateQuiz;
