import Layout from '../layouts/Layout';
import CreateProject from '../components/project/CreateProject';
import ErrorPage from '../pages/ErrorPage';
import ProjectList from '../pages/ProjectList';
import ProjectDetail from '../pages/ProjectDetail';

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
      path: 'projects/:projectId',
      element: <ProjectDetail />,
    },
    {
      path: 'create-project',
      element: <CreateProject />,
    },
  ],
};

export default ProjectRoutes;
