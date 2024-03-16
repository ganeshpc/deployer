import { useContext } from 'react';
import AuthContext from '../contexts/JWTContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Context must be inside the provider');

  return context;
};

export default useAuth;
