import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@material-ui/core';
import Layout from '../../../components/layout';
import { useQuery } from 'react-query';
import getNoteById from '../../../services/client/courseModule/getNoteById';
import Loading from '../../../components/Loading';
import renderEditor from '../../../utils/renderEditor';

const NoteDetail = () => {
  const router = useRouter();
  const noteId = router.query.id;

  const { isLoading, data } = useQuery(['note'], () => getNoteById(noteId));

  if (isLoading) {
    return <Loading />;
  }

  console.log('dadad', data);

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Typography
            align='center'
            variant='h5'
            style={{ marginBottom: '2rem' }}
          >
            {data.title}
          </Typography>

          <Box marginBottom='2rem'>
            {data.body.map((content) => renderEditor(content))}
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

export default NoteDetail;
