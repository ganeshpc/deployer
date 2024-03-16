import { Button, Card, Stack, TextField, Typography } from '@mui/material';

const SignUp = () => {
  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Sign Up</Typography>
        <TextField margin="4px" variant="outlined" label="Name" size="small" />
        <TextField
          margin="4px"
          variant="outlined"
          type="email"
          label="Email"
          size="small"
        />
        <TextField
          margin="4px"
          variant="outlined"
          label="Username"
          size="small"
        />
        <TextField
          margin="4px"
          type="password"
          variant="outlined"
          label="Password"
          size="small"
        />
        <Button margin="4px" variant="contained">
          Sign Up
        </Button>
      </Stack>
    </Card>
  );
};

export default SignUp;
