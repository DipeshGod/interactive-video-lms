import api from '../../api';

const createEnterpriseSection = async (enterpriseData) => {
  const { data } = await api.post(`/api/enterprise-section`, enterpriseData);
  return data;
};

export default createEnterpriseSection;
