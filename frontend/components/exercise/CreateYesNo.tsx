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
import { toast } from 'react-toastify';

const CreateYesNo = () => {
  const [value, setValue] = useState('yes');
  const [question, setQuestion] = useState('');
  const router = useRouter();
  const id = router.query.id;

  const queryClient = useQueryClient();
  const courseExerciseMutation = useMutation((exercise: any) =>
    createExercise(exercise, id)
  );

  const handleYesNoSubmit = () => {
    if (question.length < 5) {
      toast.error('Please enter valid question');
      return;
    }
    let answer: any;
    if (value === 'yes') {
      answer = [true];
    }
    if (value === 'no') {
      answer = [false];
    }
    let exercise = {
      question,
      answer,
      type: 'yesNo',
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
        Add A Yes/No Question
      </Typography>
      <Box marginY='1rem'>
        <TextField
          label='Enter a yes/no question'
          variant='outlined'
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
        />
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
        <Button
          style={{ marginTop: '1rem' }}
          variant='outlined'
          color='primary'
          onClick={handleYesNoSubmit}
        >
          Create Yes/No
        </Button>
      </Box>
    </>
  );
};

export default CreateYesNo;
