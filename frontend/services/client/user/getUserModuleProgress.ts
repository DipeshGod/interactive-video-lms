import api from "../../api";

const getUserModuleProgress = async (userId) => {
  const { data } = await api.get(`/api/progress?userId=${userId}`);
  return data;
};

export default getUserModuleProgress;
