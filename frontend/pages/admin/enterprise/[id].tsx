import { Typography, Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Layout from '../../../components/layout';
import Loading from '../../../components/Loading';
import getEnterpriseById from '../../../services/client/enterprise/getEnterpriseById';

const EnterPriseDetails = () => {
  const router = useRouter();
  const enterpriseId = router.query.id;

  const { isLoading, data } = useQuery(['enterprise', enterpriseId], () =>
    getEnterpriseById(enterpriseId)
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log('ent', data);

  return (
    <Layout>
      <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
        <Container>
          <Typography variant='h5' align='center'>
            Edit Enterprise Details
          </Typography>
        </Container>
      </div>
    </Layout>
  );
};

export default EnterPriseDetails;
