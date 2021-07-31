import api from '../../api';

const createNote = async (note) => {
  const { data } = await api.post('/api/note', {
    title: note.title,
    body: note.note,
    courseModule: note.moduleId,
  });
  return data;
};

export default createNote;
