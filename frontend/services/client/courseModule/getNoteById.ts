import api from '../../api';

const getNoteById = async (noteId) => {
  const { data } = await api.get(`/api/note/noteById/${noteId}`);
  return data;
};

export default getNoteById;
