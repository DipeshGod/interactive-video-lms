import api from '../../api';

const deleteCourse = async (courseId) => {
  const { data } = await api.delete(`/api/course/${courseId}`);
  return data;
};

export default deleteCourse;
