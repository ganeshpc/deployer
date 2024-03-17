import axios from './axiosService';

export const createProject = async (projectData) => {
  try {
    const response = await axios.post('/project', projectData);

    return response.data;
  } catch (error) {
    return error;
  }
};
