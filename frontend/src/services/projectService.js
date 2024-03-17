import axios from './axiosService';

export const createProject = async (projectData) => {
  try {
    const { name, gitUrl } = projectData;

    if (!name || !gitUrl) {
      throw new Error('Project name and git url are required');
    }

    const response = await axios.post('/project', {
      name,
      gitUrl,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
