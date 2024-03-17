import { createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import ProjectRoutes from './ProjectRoutes';

const router = createBrowserRouter([AuthRoutes, ProjectRoutes]);

export default router;
