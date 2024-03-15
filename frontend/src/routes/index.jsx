import { createBrowserRouter } from 'react-router-dom';
import CreateProject from '../components/CreateProject';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateProject />,
  },
]);

export default router;
