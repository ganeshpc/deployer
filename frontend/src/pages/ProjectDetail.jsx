import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Deployments from '../components/project/Deployments';
import useProject from '../hooks/useProject';
import { Box, Button, Grid, Typography } from '@mui/material';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const projectContext = useProject();

  const [project, setProject] = useState(null);

  useEffect(() => {
    projectContext.getProject(projectId).then((project) => {
      setProject(project);
    });
  }, [projectId]);

  return (
    <>
      <Grid container justifyContent="space-between">
        <Typography variant="h4">Project Details</Typography>
        <Link to="/projects">
          <Button variant="outlined">Back</Button>
        </Link>
      </Grid>
      <Box marginTop={3}>{project && <Deployments project={project} />}</Box>
    </>
  );
};

export default ProjectDetail;
