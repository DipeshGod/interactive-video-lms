import api from "../../api";

const createNote = async (title, note, moduleId) => {
  const { data } = await api.post("/api/note", {
    title,
    body: note,
    courseModule: moduleId,
  });
  return data;
};

export default createNote;
