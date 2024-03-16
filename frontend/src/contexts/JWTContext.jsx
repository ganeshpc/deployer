import { createContext, useReducer } from 'react';

import authReducer, { initialState } from './auth-reducer/auth';

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (email, password) => {
    // Make a POST request to the server
    // If the request is successful, dispatch the user object to the reducer
    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  const logout = () => {
    // Make a POST request to the server
    // If the request is successful, dispatch the user object to the reducer
    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  const signUp = (user) => {
    // Make a POST request to the server
    // If the request is successful, dispatch the user object to the reducer
    // If the request is unsuccessful, dispatch an error message to the reducer
  };

  return (
    <JWTContext.Provider value={{ ...state, login, logout, signUp }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
