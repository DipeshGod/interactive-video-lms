import { Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Layout from '../../components/layout';
import Loading from '../../components/Loading';
import getEnterpriseById from '../../services/client/enterprise/getEnterpriseById';

const Dashboard = () => {
  const router = useRouter();
  const enterpriseId = router.query.id;

  const { isLoading, data } = useQuery(['enterprise', enterpriseId], () =>
    getEnterpriseById(enterpriseId)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log('da', data);

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          {data.length === 0 ? (
            <Typography variant='h5'>Your account is deactivated</Typography>
          ) : (
            <Typography variant='h5' align='center'>
              Welcome
            </Typography>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

export default Dashboard;
