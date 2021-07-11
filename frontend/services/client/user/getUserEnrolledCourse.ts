import api from '../../api';

const getUserEnrolledCourse = async (id) => {
    const { data } = await api.get(`/api/user/enrolled-courses/${id}`);
    return data;
};

export default getUserEnrolledCourse;
