import { createBrowserRouter } from 'react-router-dom';

import CreateProject from '../components/CreateProject';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../Layout';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'create-project',
        element: <CreateProject />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
