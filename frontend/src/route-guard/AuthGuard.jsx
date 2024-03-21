import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthGuard = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        navigate('/auth/login', {
          state: {
            from: location.pathname,
          },
          replace: true,
        });
      }
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
