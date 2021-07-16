import api from '../../api';

const enrollUserToCourse = async (enrollInfo) => {
    const { data } = await api.post(`/api/enrolled`,enrollInfo);
    return data;
};

export default enrollUserToCourse;
