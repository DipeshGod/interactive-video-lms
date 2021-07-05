import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { useMutation, useQueryClient } from 'react-query';
import createExercise from '../../services/client/exercise/createExercise';
import { toast } from 'react-toastify';

const CreateMultipleChoice = () => {
  const [question, setQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState([]);

  const queryClient = useQueryClient();
  const courseExerciseMutation = useMutation((exercise: any) =>
    createExercise(exercise)
  );

  const router = useRouter();
  const id = router.query.id;

  const handleOptionInput = (e) => {
    if (e.keyCode === 13) {
      setQuizOptions([...quizOptions, e.target.value]);
      e.target.value = '';
    }
  };

  let answer = [];
  const handleAnswerSelect = (e) => {
    if (answer.includes(e.target.value) && !e.target.checked) {
      answer = answer.filter((item) => item !== e.target.value);
    }
    if (e.target.checked) {
      answer.push(e.target.value);
    }
    console.log(answer);
  };

  const handleMultipleChoiceSubmit = () => {
    if (question.length < 5) {
      toast.error('Please enter valid question');
      return;
    }
    let exercise = {
      question,
      options: quizOptions,
      answer,
      type: 'multipleChoice',
      category: 'module',
      association: id,
    };
    courseExerciseMutation.mutate(exercise, {
      onSuccess: () => {
        queryClient.invalidateQueries(['exercise', id]);
      },
      onError: () => {
        console.log('err aayo hai');
      },
    });
  };

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Create Mutiple Choice Question
      </Typography>
      <Box marginY='1rem'>
        <Box marginY='1rem'>
          <TextField
            label='Enter the question'
            variant='outlined'
            fullWidth
            onChange={(e) => setQuestion(e.target.value)}
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

        {quizOptions.map((option, i) => (
          <Box key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  name={`${i}`}
                  value={i}
                  onChange={handleAnswerSelect}
                />
              }
              label={option}
            />
          </Box>
        ))}
      </Box>
      <Button
        style={{ marginTop: '1rem' }}
        variant='outlined'
        color='primary'
        onClick={handleMultipleChoiceSubmit}
      >
        Create Mutiple Choice Question
      </Button>
    </>
  );
};

export default CreateMultipleChoice;
