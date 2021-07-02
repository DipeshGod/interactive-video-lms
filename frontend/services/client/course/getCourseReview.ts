import api from '../../api';

const getCourseReview = async (courseId) => {
  const { data } = await api.get(`/api/review/${courseId}`);
  return data;
};

export default getCourseReview;
