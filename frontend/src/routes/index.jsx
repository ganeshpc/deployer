import { createBrowserRouter } from 'react-router-dom';

import CreateProject from '../components/CreateProject';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <CreateProject />,
      },
    ],
  },
]);

export default router;
