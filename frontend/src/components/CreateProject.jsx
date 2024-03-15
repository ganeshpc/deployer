import { Button, Grid, TextField } from '@mui/material';

const CreateProject = () => {
  return (
    <Grid container flexDirection="column" spacing={2} width={'600px'}>
      <TextField variant="outlined" label="Project Name"></TextField>
      <TextField variant="outlined" label="Gir Url"></TextField>
      <Button variant="contained">Create Project</Button>
    </Grid>
  );
};

export default CreateProject;
