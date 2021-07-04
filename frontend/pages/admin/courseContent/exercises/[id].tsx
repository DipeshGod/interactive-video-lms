import { Container } from '@material-ui/core';
import ManageExercise from '../../../../components/admin/ManageExercise';
import Layout from '../../../../components/layout';

export async function getServerSideProps(context) {
  const id = context.params.id;
  return {
    props: { id }, // will be passed to the page component as props
  };
}

const Exercises = ({ id }) => {
  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <ManageExercise id={id} />
        </Container>
      </div>
    </Layout>
  );
};

export default Exercises;
