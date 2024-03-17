import Layout from '../layouts/Layout';
import CreateProject from '../components/CreateProject';
import ErrorPage from '../pages/ErrorPage';

const ProjectRoutes = {
  path: 'project',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'create-project',
      element: <CreateProject />,
    },
  ],
};

export default ProjectRoutes;
