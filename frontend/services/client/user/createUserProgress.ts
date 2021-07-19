import api from '../../api';

const createUserProgress = async (progressData) => {
  const { data } = await api.post(`/api/progress`, progressData);
  return data;
};

export default createUserProgress;
