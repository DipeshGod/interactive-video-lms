import api from '../../api';

const getUserCourseProgress = async (courseId, userId) => {
  const { data } = await api.get(
    `/api/progress?courseId=${courseId}&userId=${userId}`
  );
  return data;
};

export default getUserCourseProgress;
