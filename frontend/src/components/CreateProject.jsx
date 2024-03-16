import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material';

const CreateProject = () => {
  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <TextField
          margin="4px"
          variant="outlined"
          label="Project Name"
          size="small"
        ></TextField>
        <TextField
          margin="4px"
          variant="outlined"
          label="Git Url"
          size="small"
        ></TextField>
        <Button margin="4px" variant="contained">
          Create Project
        </Button>
      </Stack>
    </Card>
  );
};

export default CreateProject;
