import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from '../components/Header';
import GuestGuard from '../route-guard/GuestGuard';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const AuthLayout = () => {
  const userContext = useAuth();

  return (
    <>
      <Header />
      <div style={{ height: '100px' }}></div>
      <GuestGuard>
        <Container maxWidth="sm">
          <Loader open={userContext.isLoading} />
          <Outlet />
        </Container>
      </GuestGuard>
    </>
  );
};

export default AuthLayout;
