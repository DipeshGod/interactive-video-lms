import api from '../../api';

const createExercise = async (exercise) => {
  const { data } = await api.post(`/api/exercise`, exercise);
  return data;
};

export default createExercise;
