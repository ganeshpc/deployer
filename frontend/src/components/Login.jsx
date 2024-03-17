import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
});

const Login = () => {
  const userContext = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userContext.login(values.email, values.password);
    },
  });

  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Login</Typography>
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
