import api from '../../api';

const addQnAAnswer = async (answer, qnaId) => {
  const { data } = await api.put(`/api/qna/answer/${qnaId}`, answer);
  return data;
};

export default addQnAAnswer;
