import { createContext, useEffect, useReducer } from 'react';

import { jwtDecode } from 'jwt-decode';

import authReducer, { initialState } from './auth-reducer/reducer';
import * as authActions from './auth-reducer/actions';
import * as userService from '../services/userService';
import axiosService from '../services/axiosService';

const JWTContext = createContext(null);

const setUserSession = (authToken) => {
  if (authToken) {
    localStorage.setItem('authToken', authToken);
    axiosService.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authToken}`;
  } else {
    localStorage.removeItem('authToken');
    delete axiosService.defaults.headers.common['Authorization'];
  }
};

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
          const userData = jwtDecode(authToken);

          dispatch({ type: authActions.LOGIN, payload: userData });
        } else {
          dispatch({ type: authActions.LOGOUT });
        }
      } catch (error) {
        dispatch({ type: authActions.LOGOUT });
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: authActions.SET_LOADING });

    const user = await userService.login(email, password);

    const authToken = user.authToken;

    setUserSession(authToken);

    delete user.authToken;

    dispatch({ type: authActions.LOGIN, payload: user });

    dispatch({ type: authActions.END_LOADING });
  };

  const logout = () => {
    setUserSession(null);

    userService.logout(state.user.email);

    dispatch({ type: authActions.LOGOUT });
  };

  const signUp = async (user) => {
    dispatch({ type: authActions.SET_LOADING });
    const createdUser = await userService.signUp(user);

    dispatch({ type: authActions.END_LOADING });
    return createdUser;
  };

  return (
    <JWTContext.Provider value={{ ...state, login, logout, signUp }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
