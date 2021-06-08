import api from '../../api';

const getCoursesById = async (courseId) => {
  const { data } = await api.get(`${process.env.API}/course/${courseId}`);
  return data;
};

export default getCoursesById;
