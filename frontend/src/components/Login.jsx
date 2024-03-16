import { Button, Card, Stack, TextField, Typography } from '@mui/material';

const Login = () => {
  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Login</Typography>
        <TextField
          margin="4px"
          variant="outlined"
          label="Email or Username"
          size="small"
        />
        <TextField
          margin="4px"
          variant="outlined"
          label="Password"
          size="small"
        />
        <Button margin="4px" variant="contained">
          Login
        </Button>
      </Stack>
    </Card>
  );
};

export default Login;
