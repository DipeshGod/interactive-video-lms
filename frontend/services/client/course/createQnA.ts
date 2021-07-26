import api from "../../api";

const createQnA = async (qnaData) => {
  const { data } = await api.post("/api/qna", qnaData);
  return data;
};

export default createQnA;
