import api from '../../api';

const createReview = async (review) => {
  const { data } = await api.post('/api/review', review);
  return data;
};

export default createReview;
