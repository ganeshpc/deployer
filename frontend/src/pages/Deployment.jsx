import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import useProject from '../hooks/useProject';
import DeploymentLogs from '../components/project/DeploymentLogs';

const Deployment = () => {
  const { projectId, deploymentId } = useParams();
  const projectContext = useProject();

  useEffect(() => {
    projectContext.getDeployment(deploymentId);
  }, [deploymentId]);

  return (
    <Box>
      <Grid container justifyContent="space-between">
        <Typography variant="h4">Deployment</Typography>
        <Link to={`/projects/${projectId}`}>
          <Button variant="outlined">Back</Button>
        </Link>
      </Grid>
      {projectContext.deployment && (
        <DeploymentLogs deploymentId={deploymentId} />
      )}
    </Box>
  );
};

export default Deployment;
