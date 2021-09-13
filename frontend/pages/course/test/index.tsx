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

const Test = () => {
  const router = useRouter();
  const course = router.query.course;
  const [page, setPage] = useState(1);
  const [userAnswer, setUserAnswer] = useState([]);

  const { isLoading, data, isPreviousData } = useQuery(
    ['finaltest', course, page],
    () => getExerciseById(course, 'finalTest', page, 5),
    { keepPreviousData: true }
  );

  const handleYesNoQuizChange = (e, answer, i) => {
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
          });
        })
      );
    }
  };

  const handleMultipleChoiceChange = (e, answer, i) => {
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
            answer: answer,
          });
        })
      );
    }
  };

  console.log(data);

  const showOptions = (item, i) => {
    switch (item.type) {
      case 'yesNo':
        return (
          <RadioGroup
            onChange={(e) => handleYesNoQuizChange(e, item.answer, i)}
          >
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        );
      case 'quiz':
        return (
          <RadioGroup
            onChange={(e) => handleYesNoQuizChange(e, item.answer, i)}
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
            onChange={(e) => handleMultipleChoiceChange(e, item.answer, i)}
          >
            {item.options.map((option, i) => (
              <FormControlLabel
                label={option}
                key={i}
                value={option}
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
              onClick={() => {
                if (page < data.totalPages) {
                  setPage(page + 1);
                }
              }}
              disabled={isPreviousData || page >= data.totalPages}
            >
              Next
            </Button>
            {page >= data.totalPages && (
              <Button color='primary' variant='contained'>
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
