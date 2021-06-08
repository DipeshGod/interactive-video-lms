import api from '../../api';

const getCoursesById = async (courseId) => {
  const { data } = await api.get(`api/course/${courseId}`);
  return data;
};

export default getCoursesById;
