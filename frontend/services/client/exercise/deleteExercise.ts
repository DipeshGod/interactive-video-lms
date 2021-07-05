import api from '../../api';

const deleteExercise = async (id) => {
  const { data } = await api.delete(`/api/exercise/${id}`);
  return data;
};

export default deleteExercise;
