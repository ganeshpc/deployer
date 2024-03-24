import { useFormik } from 'formik';
import * as yup from 'yup';

import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const userContext = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await userContext.login(values.email, values.password);
      navigate('/projects');
    },
  });

  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4">Login</Typography>
          <Link to="/signup">
            <Button variant="text">
              Signup
            </Button>
          </Link>
        </Box>
        <TextField
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          variant="outlined"
          label="Email"
          size="small"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          variant="outlined"
          label="Password"
          size="small"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="contained" onClick={formik.handleSubmit}>
          Login
        </Button>
      </Stack>
    </Card>
  );
};

export default Login;
