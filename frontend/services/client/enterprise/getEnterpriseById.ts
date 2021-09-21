import api from '../../api';

const getEnterpriseById = async (enterpriseId) => {
  const { data } = await api.get(`/api/enterprise/${enterpriseId}`);
  return data;
};

export default getEnterpriseById;
