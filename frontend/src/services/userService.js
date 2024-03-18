import axios from './axiosService';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/user/login', { email, password });
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await axios.post('/user', userData);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (email) => {
  if (!email) {
    throw new Error('Email is required');
  }
  try {
    const response = await axios.post('/user/logout', { email });
  } catch (error) {
    throw error;
  }
};
