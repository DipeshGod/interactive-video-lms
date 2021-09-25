import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../../components/layout';
import Loading from '../../../components/Loading';
import getExerciseById from '../../../services/client/exercise/getExerciseById';
import produce from 'immer';
import _ from 'lodash';
import { toast } from 'react-toastify';
import calculateScore from '../../../utils/calculateScore';

const Test = () => {
  const router = useRouter();
  const course = router.query.course;
  const [page, setPage] = useState(1);
  let [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  const { isLoading, data, isPreviousData } = useQuery(
    ['finaltest', course, page],
    () => getExerciseById(course, 'finalTest', page, 5),
    { keepPreviousData: true }
  );

  const handleYesNoQuizChange = (e, answer, i, type, options) => {
    const found = userAnswer.find((element) => element.id === i);

    if (found) {
      setUserAnswer(
        produce((draft) => {
          const selection = draft.find((selection) => selection.id === i);
          selection.userSelection = e.target.value;
        })
      );
    } else {
      setUserAnswer(
        produce((draft) => {
          draft.push({
            id: i,
            userSelection: e.target.value,
            answer: answer[0],
            type: type,
            options: options,
          });
        })
      );
    }
  };

  const handleMultipleChoiceChange = (e, answer, i, type, options) => {
    const found = userAnswer.find((element) => element.id === i);

    if (found) {
      //1. check if the element is checked or unchecked
      if (e.target.checked) {
        // 1.a if checked add it to the userselection if not already there
        if (found.userSelection.split(' ').includes(e.target.value)) {
          return;
        }
        setUserAnswer(
          produce((draft) => {
            const selection = draft.find((selection) => selection.id === i);
            selection.userSelection += ` ${e.target.value}`;
          })
        );
      } else {
        // 1.b if unchecked remove if from userselection
        setUserAnswer(
          produce((draft) => {
            const selection = draft.find((selection) => selection.id === i);
            selection.userSelection = selection.userSelection
              .split(' ')
              .filter((item) => item !== e.target.value)
              .join(' ');
          })
        );
      }
    } else {
      setUserAnswer(
        produce((draft) => {
          draft.push({
            id: i,
            userSelection: e.target.value,
            answer: answer,
            type: type,
            options: options,
          });
        })
      );
    }
  };

  const handleSubmitAndGetResult = () => {
    //1. User should have attempted all the questions in the page
    if (userAnswer.length < 5) {
      return toast.warning('Please answer all the questions');
    }

    //2. Calculate final score
    const finalPageScore = calculateScore(userAnswer);
    const finalScore = score + finalPageScore;

    //3. Make api call to update users final progress
    console.log('finalScore', finalScore);
  };

  const handleNextPage = () => {
    //1. User should have attempted all the questions in the page
    if (userAnswer.length < 5) {
      return toast.warning('Please answer all the questions');
    }
    //2. Calculate the score for the page
    let pageScore = calculateScore(userAnswer);

    //3a. If first page
    //3b. set pageScore value in state
    if (page === 1) {
      setScore(pageScore);
    }

    //3c. If other pages
    //3d. update score value in state (add to the previous score from the page before)
    if (page > 1) {
      let currentScore = score + pageScore;
      setScore(currentScore);
    }

    //change the page
    let nextPage = page + 1;
    setPage(nextPage);
  };

  const showOptions = (item, i) => {
    switch (item.type) {
      case 'yesNo':
        return (
          <RadioGroup
            onChange={(e) =>
              handleYesNoQuizChange(e, item.answer, i, item.type, item.options)
            }
          >
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        );
      case 'quiz':
        return (
          <RadioGroup
            onChange={(e) =>
              handleYesNoQuizChange(e, item.answer, i, item.type, item.options)
            }
          >
            {item.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        );
      case 'multipleChoice':
        return (
          <FormGroup
            onChange={(e) =>
              handleMultipleChoiceChange(
                e,
                item.answer,
                i,
                item.type,
                item.options
              )
            }
          >
            {item.options.map((option, i) => (
              <FormControlLabel
                label={option}
                key={i}
                value={i}
                control={<Checkbox />}
              />
            ))}
          </FormGroup>
        );
      default:
        return;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div
        style={{ marginTop: '6rem', marginBottom: '3rem', minHeight: '75vh' }}
      >
        <Container>
          <Typography variant='h5' align='center' gutterBottom>
            FINAL TEST
          </Typography>
          <Typography align='center'>
            Answer questions carefully. Wish you all the best !
          </Typography>
          <Box marginTop='3rem' minHeight='50vh'>
            {data.exercises.map((item, i) => (
              <Grid key={i} container>
                <Grid item xs={12} lg={12}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography gutterBottom variant='h6'>
                      {i + 1}. {item.question}
                    </Typography>
                    <Chip
                      label={item.type.toUpperCase()}
                      style={{ backgroundColor: '#ffb300' }}
                      size='small'
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '2rem' }}>
                  {showOptions(item, i)}
                  <Divider />
                </Grid>
              </Grid>
            ))}
          </Box>

          <Box display='flex' justifyContent='space-between'>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleNextPage}
              disabled={isPreviousData || page >= data.totalPages}
            >
              Next
            </Button>
            {page >= data.totalPages && (
              <Button
                color='primary'
                variant='contained'
                onClick={handleSubmitAndGetResult}
              >
                Submit And Get Result
              </Button>
            )}
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default Test;
