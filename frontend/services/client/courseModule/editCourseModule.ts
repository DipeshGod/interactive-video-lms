import api from '../../api';

const editCourseModule = async (updatedModule, id) => {
    const { data } = await api.put(`/api/course-module/${id}`, updatedModule);
    return data;
};

export default editCourseModule;
