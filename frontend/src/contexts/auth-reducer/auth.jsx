import { LOGIN, LOGOUT, SIGNUP } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case SIGNUP:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
