import api from '../../api';

const getQnAById = async (qnaId) => {
  const { data } = await api.get(`/api/qna/qnaById/${qnaId}`);
  return data;
};

export default getQnAById;
