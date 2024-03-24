import { useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects', {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return children;
};

export default GuestGuard;
