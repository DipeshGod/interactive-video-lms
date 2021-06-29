import { Container } from '@material-ui/core';
import CreateExercise from '../../../../components/admin/CreateExercise';
import Layout from '../../../../components/layout';

const Exercises = () => {
  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <CreateExercise />
        </Container>
      </div>
    </Layout>
  );
};

export default Exercises;
