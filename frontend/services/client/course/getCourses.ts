import api from '../../api';

const getCourses = async () => {
  const { data } = await api.get(`/api/course`);
  return data;
};

export default getCourses;
