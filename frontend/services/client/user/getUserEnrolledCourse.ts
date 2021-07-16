import api from '../../api';

const getUserEnrolledCourse = async (id) => {
    const { data } = await api.get(`/api/enrolled/${id}`);
    return data;
};

export default getUserEnrolledCourse;
