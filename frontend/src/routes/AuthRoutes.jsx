import SignUp from '../components/SignUp';
import Login from '../components/Login';
import AuthLayout from '../layouts/AuthLayout';
import ErrorPage from '../pages/ErrorPage';

const AuthRoutes = {
  path: 'auth',
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

export default AuthRoutes;
