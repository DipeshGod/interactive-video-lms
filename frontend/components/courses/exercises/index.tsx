import { useState } from 'react';
import {
  Button,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';
import Loading from '../../Loading';
import YesNo from './YesNo';
import Result from './Result';
import Quiz from './Quiz';
import Multichoice from './MultiChoice';
import updateUserProgress from '../../../services/client/user/updateUserProgress';
import { useMutation, useQueryClient } from 'react-query';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Exercises = ({
  isQuizOpen,
  setIsQuizOpen,
  exerciseLoading,
  exercises,
}) => {
  const classes = useStyles();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const queryClient = useQueryClient();

  console.log('exercise', exercises);

  const userCourseProgressMutation = useMutation((progressData: any) =>
    updateUserProgress(
      exercises[0].association,
      JSON.parse(localStorage.getItem('user'))._id,
      progressData
    )
  );

  const changeQuestion = () => {
    if (questionIndex !== exercises.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    } else {
      console.log('mero score', score);
      userCourseProgressMutation.mutate(
        {
          preTestScore: {
            solvedQuestions: score,
            totalQuestions: exercises.length,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['progress']);
          },
        }
      );
      setIsFinished(true);
    }
  };

  const renderExcercise = (exercises) => {
    if (exercises.length === 0) {
      return <Typography variant='h6'>Not availabe</Typography>;
    }
    const { type, question, options, answer } = exercises[questionIndex];
    switch (type) {
      case 'yesNo':
        return (
          <YesNo
            question={question}
            answer={answer[0]}
            score={score}
            setScore={setScore}
            changeQuestion={changeQuestion}
          />
        );
      case 'quiz':
        return (
          <Quiz
            question={question}
            answer={answer}
            options={options}
            score={score}
            setScore={setScore}
            changeQuestion={changeQuestion}
          />
        );
      case 'multipleChoice':
        return (
          <Multichoice
            question={question}
            answer={answer}
            options={options}
            score={score}
            setScore={setScore}
            changeQuestion={changeQuestion}
          />
        );
      default:
        return;
    }
  };

  if (exerciseLoading) {
    return <Loading />;
  }

  return (
    <Dialog open={isQuizOpen} onClose={() => setIsQuizOpen(false)}>
      <DialogContent>
        <div>
          {isFinished ? (
            <Result score={score} total={exercises.length} />
          ) : (
            renderExcercise(exercises)
          )}
        </div>

        <Box display='flex' justifyContent='flex-end' padding='10px'>
          <Button
            variant='outlined'
            size='small'
            onClick={() => setIsQuizOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Exercises;
