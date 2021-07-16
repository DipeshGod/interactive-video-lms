import api from "../../api";

const editUser = async (id, updatedData) => {
  const { data } = await api.put(`/api/user/${id}`, updatedData);
  return data;
};

export default editUser;
