import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Layout from '../../components/layout';
import createQnA from '../../services/client/course/createQnA';
import { Context as UserContext } from '../../context/user';
import { toast } from 'react-toastify';
import QnACard from '../../components/courses/QnACard';

const QNA = () => {
  const [question, setQuestion] = useState('');
  const { state } = useContext(UserContext);
  const router = useRouter();
  const courseId = router.query.courseId;

  const queryClient = useQueryClient();
  const qnaMutation = useMutation((qnaData: any) => createQnA(qnaData));

  const handleQuestionSubmit = () => {
    if (question.length > 10) {
      qnaMutation.mutate(
        {
          user: state.user._id,
          course: courseId,
          question,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['qna', courseId]);
            setQuestion('');
          },
          onError: () => {
            console.log('error aayo');
          },
        }
      );
    } else {
      toast.error('Please ask valid question');
    }
  };

  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Typography variant='h5' align='center'>
            Question And Answer Section
          </Typography>
          <Box marginY='2rem'>
            <Grid container justify='space-between'>
              <Grid xs={12} md={5}>
                <Box marginBottom='2rem'>
                  <QnACard courseId={courseId} />
                </Box>
              </Grid>
              <Grid xs={12} md={6}>
                <Box>
                  <Paper variant='outlined' style={{ padding: '1rem' }}>
                    <Typography variant='h6' align='center'>
                      Ask Your Question !
                    </Typography>
                    <Box>
                      <TextField
                        id='outlined-select-currency-native'
                        label='metion your question briefly ..'
                        margin='normal'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows='5'
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </Box>
                    <Box marginTop='1rem'>
                      <Button
                        onClick={handleQuestionSubmit}
                        size='large'
                        variant='outlined'
                        color='secondary'
                      >
                        Submit question
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default QNA;
