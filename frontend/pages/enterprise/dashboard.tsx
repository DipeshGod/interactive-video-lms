import { Box, Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Layout from '../../components/layout';
import Loading from '../../components/Loading';
import CreateEnterpriseSectionDialog from '../../components/enterprise/CreateEnterpriseSectionDialog';
import getEnterpriseById from '../../services/client/enterprise/getEnterpriseById';
import { useState } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const enterpriseId = router.query.id;

  const [open, setOpen] = useState(false);

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
            <>
              <Typography variant='h5' align='center' color='secondary'>
                Welcome {data.name}
              </Typography>
              <Box marginTop='2rem'>
                <Button
                  onClick={() => setOpen(true)}
                  variant='contained'
                  color='primary'
                >
                  Create New Section
                </Button>
                <CreateEnterpriseSectionDialog
                  open={open}
                  handleClose={() => setOpen(false)}
                />
              </Box>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
};

// do not remove
export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

export default Dashboard;
