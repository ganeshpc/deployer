import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import AuthGuard from '../route-guard/AuthGuard';
import Header from '../components/Header';
import useProject from '../hooks/useProject';
import Loader from '../components/Loader';

const Layout = () => {
  const projectContext = useProject();

  return (
    <>
      <Header />
      <div style={{ height: '100px' }}></div>
      <AuthGuard>
        <Container maxWidth="md">
          <Loader open={projectContext.isLoading} />
          <Outlet />
        </Container>
      </AuthGuard>
    </>
  );
};

export default Layout;
