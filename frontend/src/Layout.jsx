import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Header from './components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{height: '100px'}}></div>
      <Container maxWidth='sm'>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
