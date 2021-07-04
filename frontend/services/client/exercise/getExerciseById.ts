import api from '../../api';

const getExerciseById = async (id) => {
  const { data } = await api.get(`/api/exercise/${id}`);
  return data;
};

export default getExerciseById;
