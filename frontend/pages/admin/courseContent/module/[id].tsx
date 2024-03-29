import Link from 'next/link'
import { Button, Container, Divider } from '@material-ui/core';
import EditModule from '../../../../components/admin/EditModule';
import ManageExercise from '../../../../components/admin/ManageExercise';
import Layout from '../../../../components/layout';

export async function getServerSideProps(context) {
  const id = context.params.id;
  const category = context.query.category;
  return {
    props: { id, category }, // will be passed to the page component as props
  };
}

const Module = ({ id, category }) => {
  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <EditModule id={id} />
          <Divider style={{ margin: '2rem 0' }} />
          <ManageExercise id={id} category={category} />
          <div style={{marginBottom:'2rem'}}>
            <Link href={`/admin/courseContent/module/notes/${id}`}>
          <Button size='large' variant='contained' color='secondary'>CREATE NOTES</Button>
          </Link>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Module;
