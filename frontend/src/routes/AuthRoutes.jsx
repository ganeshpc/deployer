import SignUp from '../components/SignUp';
import Login from '../components/Login';
import AuthLayout from '../layouts/AuthLayout';
import ErrorPage from '../pages/ErrorPage';

const AuthRoutes = {
  path: '',
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
