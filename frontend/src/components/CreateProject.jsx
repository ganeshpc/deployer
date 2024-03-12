import { Grid, TextField, Button, Paper } from '@mui/material';

const CreateProject = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12}>
        <h1>Create Project</h1>
      </Grid>
      <Paper sx={{ height: '500px', width: '500px' }}>
        <TextField label="Project Name" variant="outlined" fullWidth />
        <TextField label="Git Url" variant="outlined" fullWidth />
        <Button variant="contained" fullWidth>
          Create Project
        </Button>
      </Paper>
    </Grid>
  );
};

export default CreateProject;
