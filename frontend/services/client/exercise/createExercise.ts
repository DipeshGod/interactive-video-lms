import api from '../../api';

const createExercise = async (exercise, id) => {
  const { data } = await api.post(
    `/api/course-module/exercise/${id}`,
    exercise
  );
  return data;
};

export default createExercise;
