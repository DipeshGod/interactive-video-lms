import api from '../../api';

const createCourseModule = async (courseModule) => {
  const { data } = await api.post('/api/course-module', courseModule);
  return data;
};

export default createCourseModule;
