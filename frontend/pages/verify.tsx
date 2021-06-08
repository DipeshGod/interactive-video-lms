import { useRouter } from 'next/router';
import { Typography, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import api from '../services/api';

const Verify = ({ id }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function verifyAccount() {
      const response = await api.get(`/api/auth/verify/${id}`);
      if (response.data.verified === true) {
        router.push('/login');
      } else {
        setError(true);
      }
    }
    verifyAccount();
  }, []);

  return (
    <Layout>
      <Container>
        <div style={{ paddingTop: '7rem', minHeight: '75vh' }}>
          <Typography variant='h6' align='center'>
            {error
              ? "Couldn't verify your account"
              : 'Verifying your account , please wait ...'}
          </Typography>
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { id } };
}

export default Verify;
