import api from '../../api';

const getUserByEmail = async (email: string) => {
  const { data } = await api.post(`/api/user/userByEmail`, { email });
  return data;
};

export default getUserByEmail;
