import Layout from '../layouts/Layout';
import CreateProject from '../components/CreateProject';
import ErrorPage from '../pages/ErrorPage';
import ProjectList from '../pages/ProjectList';

const ProjectRoutes = {
  path: '',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'projects',
      element: <ProjectList />,
    },
    {
      path: 'create-project',
      element: <CreateProject />,
    },
  ],
};

export default ProjectRoutes;
