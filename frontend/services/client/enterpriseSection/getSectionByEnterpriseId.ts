import api from '../../api';

const getSectionByEnterpriseId = async (enterpriseId) => {
  const { data } = await api.get(`/api/enterprise-section/${enterpriseId}`);
  return data;
};

export default getSectionByEnterpriseId;
