import {
  SET_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_DEPLOYMENTS,
  ADD_PROJECT,
  SET_DEPLOYMENT,
  SET_DEPLOYMENT_LOGS,
  ADD_DEPLOYMENT,
  SET_LOADING,
  END_LOADING,
} from './actions';

export const initialState = {
  projects: [
    // {
    //   projectName: 'proj',
    //   gitUrl: 'gitUrl',
    //   deployments: [
    //       {
    //           id: 1,
    //           status: 'Pending',
    //       }
    //    ]
    // },
  ],
  deployment: {
    // id: 1,
    // other data
    // logs
  },
  deploymentLogs: [],
  isLoading: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: addProjectIfDoesNotExist(state.projects, action.payload),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    case SET_DEPLOYMENTS:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.projectId) {
            return {
              ...project,
              deployments: action.payload.deployments,
            };
          }
          return project;
        }),
      };

    case ADD_DEPLOYMENT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.projectId) {
            return {
              ...project,
              deployments: [action.payload.deployment, ...project.deployments],
            };
          }
          return project;
        }),
      };

    case SET_DEPLOYMENT:
      return {
        ...state,
        deployment: action.payload,
      };

    case SET_DEPLOYMENT_LOGS:
      return {
        ...state,
        deploymentLogs: action.payload,
      };

    case SET_LOADING:
      console.log('setting loading true')
      return {
        ...state,
        isLoading: true,
      };

    case END_LOADING:
      console.log('setting loading false')
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

const addProjectIfDoesNotExist = (projects, project) => {
  const index = projects.findIndex((i) => i.id === project.id);

  if (index > -1) {
    projects[index] = project;
    return projects;
  }

  return [projects, project];
};

export default projectReducer;
