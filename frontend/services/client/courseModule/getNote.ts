import api from '../../api';

const getNote = async (moduleId) => {
  const { data } = await api.get(`/api/note/${moduleId}`);
  return data;
};

export default getNote;
