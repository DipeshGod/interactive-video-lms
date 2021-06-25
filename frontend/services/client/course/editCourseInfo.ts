import api from '../../api';

const editCourseInfo = async (updatedInfo) => {
  const { data } = await api.post(`/api/course`, updatedInfo);
  return data;
};

export default editCourseInfo;
