import { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  RadioGroup,
  Box,
  Button,
  Radio,
  Chip,
} from '@material-ui/core';

const QuizCard = ({ isOpen, handleClose, quiz }) => {
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState(0);
  const [showMesage, setShowMessage] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(Number(e.target.value));
  };

  const handleNextQuiz = () => {
    setShowMessage(null);
    if (quiz[counter].answer != value) {
      const answerIndex = quiz[counter].answer;
      const correctAnswer = quiz[counter].options[answerIndex];
      setShowMessage(`Wrong answer, the correct answer is:  ${correctAnswer}`);
      return;
    }
    if (counter === quiz.length - 1) {
      handleClose();
      return;
    }

    let nextCount = counter + 1;
    setCounter(nextCount);
  };

  return (
    <Paper
      style={{
        width: '50%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '1rem',
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography style={{ fontSize: '1.2rem' }}>
          {quiz[counter].question}
        </Typography>
        <Chip label={`${counter + 1}/${quiz.length}`} />
      </Box>
      <List>
        {quiz[counter].options.map((opt, i) => (
          <ListItem key={i}>
            <RadioGroup
              name={`quiz${i}`}
              defaultChecked={false}
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value={i} control={<Radio />} label={opt} />
            </RadioGroup>
          </ListItem>
        ))}
      </List>
      <Box style={{ marginBottom: '1rem' }}>
        {showMesage && (
          <Typography color='primary' variant='subtitle2'>
            {showMesage}
          </Typography>
        )}
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Button variant='outlined' onClick={handleNextQuiz}>
          Next
        </Button>
        <Button variant='outlined' onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default QuizCard;
