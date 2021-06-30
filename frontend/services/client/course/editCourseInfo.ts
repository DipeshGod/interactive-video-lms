import api from '../../api';

const editCourseInfo = async (updatedInfo, courseId) => {
  const { data } = await api.put(`/api/course/${courseId}`, updatedInfo);
  return data;
};

export default editCourseInfo;
