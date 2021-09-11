import api from '../../api';

const getExerciseById = async (id, category, page, limit) => {
  const { data } = await api.get(
    `/api/exercise/${id}?category=${category}&page=${page}&limit=${limit}`
  );
  return data;
};

export default getExerciseById;
