import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import Layout from '../../components/layout';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import getQnAById from '../../services/client/course/getQnAById';
import Loading from '../../components/Loading';
import Editor from '../../components/editor';
import { useState } from 'react';
import addQnAAnswer from '../../services/client/course/addQnAAnswer';
import { toast } from 'react-toastify';
import renderEditor from '../../utils/renderEditor';
import { Height } from '@material-ui/icons';

const QnADetails = () => {
  const [answer, setAnswer] = useState([]);

  const router = useRouter();
  const qnaId = router.query.qnaId;

  const queryClient = useQueryClient();
  const qnaAnswerMutation = useMutation((answer: any) =>
    addQnAAnswer(answer, qnaId)
  );

  const { isLoading, data } = useQuery(['qna', qnaId], () => getQnAById(qnaId));

  const handleDataChange = (api, data) => {
    setAnswer(data.blocks);
  };

  const submitAnswer = () => {
    if (answer.length > 0) {
      qnaAnswerMutation.mutate(
        { answer },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['qna', qnaId]);
          },
          onError: () => {
            console.log('err aayo hae');
          },
        }
      );
    } else {
      toast.error('Please provide valid answer');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const { question } = data;

  return (
    <Layout>
      <div style={{ marginTop: '6rem', minHeight: '75vh' }}>
        <Container>
          <Typography variant='h6' align='center'>
            {question}
          </Typography>
          <Box marginTop='2rem'>
            <Typography variant='h5'>Answer the question</Typography>
            <Box marginTop='1.5rem' border='1px solid grey' borderRadius='5px'>
              <Editor
                placeholder='Leave your answer here. '
                handleDataChange={handleDataChange}
              />
            </Box>
            <Box marginTop='2rem' marginBottom='3rem'>
              <Button
                variant='contained'
                color='primary'
                onClick={submitAnswer}
              >
                Submit Answer
              </Button>
            </Box>
            <Box marginBottom='2rem'>
              <Paper variant='outlined'>
                <Container>
                  <Box paddingY='1rem'>
                    {data.response.map((res) => (
                      <>
                        {res.answer.map((content) => renderEditor(content))}
                        <Divider style={{ margin: '2rem 0', height: '2px' }} />
                      </>
                    ))}
                  </Box>
                  {/* <Box>
                    <Typography gutterBottom variant="overline">
                      Answered by: {data.user.name} (
                      {data.user.type === "instructor"
                        ? "Instructor"
                        : "Student"}
                      )
                    </Typography>
                  </Box> */}
                </Container>
              </Paper>
            </Box>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default QnADetails;
