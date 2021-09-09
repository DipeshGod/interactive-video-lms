import api from '../../api';

const createEnterprise = async (enterpriseData) => {
  const { data } = await api.post(`/api/enterprise`, enterpriseData);
  return data;
};

export default createEnterprise;
