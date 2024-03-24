import { createContext, useReducer } from 'react';

import { SET_PROJECTS, CREATE_PROJECT } from './project-reducer/actions';
import projectReducer, { initialState } from './project-reducer/reducer';

import * as projectService from '../services/projectService';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const getProjects = async () => {
    const projects = await projectService.getProjects();

    // If the request is successful, dispatch the projects array to the reducer

    dispatch({ type: SET_PROJECTS, payload: projects });

    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  const createProject = async (project) => {
    const createdProject = await projectService.createProject(project);

    // If the request is unsuccessful, dispatch an error message to the reducer
    dispatch({ type: CREATE_PROJECT, payload: createdProject });
  };

  const updateProject = (project) => {
    // Make a PUT request to the server
    // If the request is successful, dispatch the project object to the reducer
    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  const deleteProject = (projectId) => {
    // Make a DELETE request to the server
    // If the request is successful, dispatch the project id to the reducer
    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  return (
    <ProjectContext.Provider
      value={{ ...state, getProjects, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
