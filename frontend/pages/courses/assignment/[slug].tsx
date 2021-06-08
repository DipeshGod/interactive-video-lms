import { Typography, Container } from '@material-ui/core';
import TextEditor from '../../../components/TextEditor';

const Assignment = () => {
  return (
    <div style={{ marginTop: '3rem' }}>
      <Container>
        <Typography variant='h6'>
          Explain in brief why small aspect of economy can make a huge
          difference in the context of national economy ?
        </Typography>
        <TextEditor />
      </Container>
    </div>
  );
};

export default Assignment;
