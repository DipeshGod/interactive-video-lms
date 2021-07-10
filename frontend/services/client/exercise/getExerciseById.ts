import api from '../../api';

const getExerciseById = async (id, category) => {
  const { data } = await api.get(`/api/exercise/${id}?category=${category}`);
  return data;
};

export default getExerciseById;
