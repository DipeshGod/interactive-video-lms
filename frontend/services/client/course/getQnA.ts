import api from "../../api";

const getQnA = async (courseId) => {
  const { data } = await api.get(`/api/qna/${courseId}`);
  return data;
};

export default getQnA;
