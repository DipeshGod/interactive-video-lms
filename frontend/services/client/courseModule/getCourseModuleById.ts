import api from '../../api';

const getCourseModuleById = async (moduleId) => {
  const { data } = await api.get(`/api/course-module/${moduleId}`);
  return data;
};

export default getCourseModuleById;
