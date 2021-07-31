import {
  Box,
  Container,
  FilledInput,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Editor from '../../../../../components/editor';
import Layout from '../../../../../components/layout';

const CreateNotes = () => {
  const handleDataChange = () => {};

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Box marginBottom='3rem'>
            <Typography align='center' variant='h4'>
              Notes for the module
            </Typography>
          </Box>
          <Grid container justify='space-between'>
            <Grid item xs={12} md={5}>
              <Paper style={{ padding: '1rem' }}>
                <h3>This is where create notes will things will go</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' style={{ marginBottom: '1rem' }}>
                Create New Note
              </Typography>
              <Box marginBottom='1rem'>
                <FilledInput
                  style={{ backgroundColor: '#efebe9' }}
                  type='email'
                  margin='dense'
                  placeholder='Give the title for note'
                  fullWidth
                />
              </Box>
              <Editor
                placeholder='Start wrting note here'
                handleDataChange={handleDataChange}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default CreateNotes;
