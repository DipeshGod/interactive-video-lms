import api from '../../api';

const updateUserProgress = async (courseId, userId, progressData) => {
  const { data } = await api.put(
    `/api/progress?courseId=${courseId}&userId=${userId}`,
    progressData
  );
  return data;
};

export default updateUserProgress;
