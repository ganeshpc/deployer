import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Card, Stack, TextField, Typography } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup.string('Enter your username').required('Username is required'),
  password: yup.string('Enter your password').required('Password is required'),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Sign Up</Typography>
        <TextField
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          variant="outlined"
          label="Name"
          size="small"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          variant="outlined"
          label="Email"
          size="small"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          variant="outlined"
          label="Username"
          size="small"
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          Sign Up
        </Button>
      </Stack>
    </Card>
  );
};

export default SignUp;
