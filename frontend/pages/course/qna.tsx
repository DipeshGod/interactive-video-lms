import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import Layout from '../../components/layout';

const QNA = () => {
  const [question, setQuestion] = useState('');

  const handleQuestionSubmit = () => {
    console.log('hello');
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
                  <Paper
                    elevation={3}
                    style={{ padding: '1rem', height: '75vh' }}
                  >
                    <Typography variant='h6' align='center'>
                      Frequent Questions and Answers
                    </Typography>
                  </Paper>
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
