import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from '../components/Header';
import GuestGuard from '../route-guard/GuestGuard';

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div style={{ height: '100px' }}></div>
      <GuestGuard>
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </GuestGuard>
    </>
  );
};

export default AuthLayout;
