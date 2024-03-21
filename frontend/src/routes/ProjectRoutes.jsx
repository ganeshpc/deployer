import Layout from '../layouts/Layout';
import CreateProject from '../components/CreateProject';
import ErrorPage from '../pages/ErrorPage';
import Projects from '../pages/Projects';

const ProjectRoutes = {
  path: '',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'projects',
      element: <Projects />,
    },
    {
      path: 'create-project',
      element: <CreateProject />,
    },
  ],
};

export default ProjectRoutes;
