import { createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import ProjectRoutes from './ProjectRoutes';

// Order of routes is important
const router = createBrowserRouter([ProjectRoutes, AuthRoutes]);

export default router;
