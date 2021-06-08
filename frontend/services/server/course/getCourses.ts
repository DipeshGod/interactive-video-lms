import api from '../../api';

const getCourses = async () => {
  const { data } = await api.get(`${process.env.API}/course`);
  return data;
};

export default getCourses;
