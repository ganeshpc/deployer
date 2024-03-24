import {
  SET_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './actions';

export const initialState = {
  projects: [
    // {
    //   projectName: 'proj',
    //   gitUrl: 'gitUrl',
    // },
  ],
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

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default projectReducer;
