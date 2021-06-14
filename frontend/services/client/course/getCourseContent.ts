import api from '../../api';

const getCourseContent = async (courseId) => {
  const { data } = await api.get(`/api/course-module/${courseId}`);
  return data;
};

export default getCourseContent;
