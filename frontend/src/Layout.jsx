import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Header from './components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
