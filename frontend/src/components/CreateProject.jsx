import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';

const CreateProject = () => {
  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Create Project</Typography>
        <TextField
          margin="4px"
          variant="outlined"
          label="Project Name"
          size="small"
        />
        <TextField
          type="url"
          margin="4px"
          variant="outlined"
          label="Git Url"
          size="small"
        />
        <Button margin="4px" variant="contained">
          Create Project
        </Button>
      </Stack>
    </Card>
  );
};

export default CreateProject;
