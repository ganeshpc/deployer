import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import AuthGuard from '../route-guard/AuthGuard';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ height: '100px' }}></div>
      <AuthGuard>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </AuthGuard>
    </>
  );
};

export default Layout;
