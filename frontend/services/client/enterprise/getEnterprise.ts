import api from '../../api';

const getEnterprise = async () => {
  const { data } = await api.get(`/api/enterprise`);
  return data;
};

export default getEnterprise;
