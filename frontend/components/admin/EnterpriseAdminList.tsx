import { useRouter } from 'next/router';
import { Box, Typography, Chip } from '@material-ui/core';

const EnterpriseAdminList = ({ enterprises }) => {
  const router = useRouter();

  return (
    <Box marginTop='2rem' marginBottom='2rem'>
      <Typography variant='h5'>ENTERPRISE CLIENTS</Typography>
      <Box marginTop='2rem'>
        {enterprises.map((enterprise, i) => (
          <Box
            onClick={() => router.push(`/admin/enterprise/${enterprise._id}`)}
            key={i}
            style={{
              backgroundColor: '#fbc02d',
              padding: '1rem',
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Chip label={`Client No : ${i + 1}`} color='primary' />
            <Typography variant='h6' style={{ marginLeft: '1rem' }}>
              {enterprise.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EnterpriseAdminList;
