import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import useProject from '../../hooks/useProject';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  projectName: yup
    .string('Enter your project name')
    .required('Project name is required'),
  gitUrl: yup.string('Enter your git url').required('Git url is required'),
});

const CreateProject = () => {
  const navigate = useNavigate();
  const projectContext = useProject();

  const formik = useFormik({
    initialValues: {
      projectName: '',
      gitUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await projectContext.createProject({
          name: values.projectName,
          gitUrl: values.gitUrl,
        });

        navigate('/projects');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Card sx={{ width: '400px', padding: '20px' }}>
      <Stack spacing={2}>
        <Typography variant="h4">Create Project</Typography>
        <TextField
          name="projectName"
          value={formik.values.projectName}
          onChange={formik.handleChange}
          variant="outlined"
          label="Project Name"
          size="small"
          error={
            formik.touched.projectName && Boolean(formik.errors.projectName)
          }
          helperText={formik.touched.projectName && formik.errors.projectName}
        />
        <TextField
          name="gitUrl"
          value={formik.values.gitUrl}
          onChange={formik.handleChange}
          type="url"
          variant="outlined"
          label="Git Url"
          size="small"
          error={formik.touched.gitUrl && Boolean(formik.errors.gitUrl)}
          helperText={formik.touched.gitUrl && formik.errors.gitUrl}
        />
        <Button variant="contained" onClick={formik.handleSubmit}>
          Create Project
        </Button>
      </Stack>
    </Card>
  );
};

export default CreateProject;
