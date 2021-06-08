import api from '../../api';

const createCourse = async (course) => {
  const { data } = await api.post('/api/course', course);
  return data;
};

export default createCourse;
