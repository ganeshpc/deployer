import { createContext, useEffect, useReducer } from 'react';

import {
  SET_PROJECTS,
  CREATE_PROJECT,
  SET_DEPLOYMENTS,
  ADD_PROJECT,
  SET_DEPLOYMENT_LOGS,
  ADD_DEPLOYMENT,
  SET_LOADING,
  END_LOADING,
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
    console.log('getting project');
    dispatch({ type: SET_LOADING });

    const projects = await projectService.getProjects();
    dispatch({ type: SET_PROJECTS, payload: projects });

    dispatch({ type: END_LOADING });
  };

  const getProject = async (projectId) => {
    dispatch({ type: SET_LOADING });

    const project = await projectService.getProject(projectId);
    dispatch({ type: ADD_PROJECT, payload: project });

    dispatch({ type: END_LOADING });

    return project;
  };

  const createProject = async (project) => {
    dispatch({ type: SET_LOADING });

    const createdProject = await projectService.createProject(project);
    dispatch({ type: CREATE_PROJECT, payload: createdProject });

    dispatch({ type: END_LOADING });
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
    dispatch({ type: SET_LOADING });

    const deployments = await projectService.getDeployments(projectId);
    dispatch({ type: SET_DEPLOYMENTS, payload: { projectId, deployments } });

    dispatch({ type: END_LOADING });

    return deployments;
  };

  const getDeployment = async (deploymentId) => {
    dispatch({ type: SET_LOADING });

    const deployment = await projectService.getDeployment(deploymentId);
    dispatch({ type: SET_DEPLOYMENTS, payload: deployment });

    dispatch({ type: END_LOADING });

    return deployment;
  };

  const getDeploymentLogs = async (deploymentId) => {
    const logs = await projectService.getDeploymentLogs(deploymentId);

    dispatch({ type: SET_DEPLOYMENT_LOGS, payload: logs });

    return logs;
  };

  const deployProject = async (projectId) => {
    dispatch({ type: SET_LOADING });

    const deployment = await projectService.deployProject(projectId);
    dispatch({ type: ADD_DEPLOYMENT, payload: { projectId, deployment } });

    dispatch({ type: END_LOADING });
  };

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
        getDeployment,
        getDeploymentLogs,
        deployProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
