import { createContext, useEffect, useReducer } from 'react';

import { jwtDecode } from 'jwt-decode';

import authReducer, { initialState } from './auth-reducer/reducer';
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

          dispatch({ type: 'LOGIN', payload: userData });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const user = await userService.login(email, password);

    const authToken = user.authToken;

    setUserSession(authToken);

    delete user.authToken;

    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    setUserSession(null);

    userService.logout(state.user.email);

    dispatch({ type: 'LOGOUT' });
  };

  const signUp = async (user) => {
    const createdUser = await userService.signUp(user);

    return createdUser;
  };

  return (
    <JWTContext.Provider value={{ ...state, login, logout, signUp }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
