import { createContext, useEffect, useReducer } from 'react';

import {
  SET_PROJECTS,
  CREATE_PROJECT,
  SET_DEPLOYMENTS,
  ADD_PROJECT,
} from './project-reducer/actions';
import projectReducer, { initialState } from './project-reducer/reducer';

import * as projectService from '../services/projectService';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const projects = await projectService.getProjects();

    // If the request is successful, dispatch the projects array to the reducer

    dispatch({ type: SET_PROJECTS, payload: projects });

    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  const getProject = async (projectId) => {
    const project = await projectService.getProject(projectId);

    dispatch({ type: ADD_PROJECT, payload: project });

    return project;
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

  const getDeployments = async (projectId) => {
    const deployments = await projectService.getDeployments(projectId);

    dispatch({ type: SET_DEPLOYMENTS, payload: { projectId, deployments } });

    return deployments;
  };

  const getDeployment = async (deploymentId) => {
    // Make a GET request to the server
    const deployment = await projectService.getDeployment(deploymentId);

    dispatch({ type: SET_DEPLOYMENTS, payload: deployment })

    return deployment;
  }

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        getProjects,
        createProject,
        updateProject,
        deleteProject,
        getDeployments,
        getProject,
        getDeployment
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
