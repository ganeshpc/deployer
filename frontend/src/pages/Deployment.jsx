import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useProject from '../hooks/useProject';
import { Box, Typography } from '@mui/material';
import DeploymentLogs from '../components/project/DeploymentLogs';

const Deployment = () => {
  const { deploymentId } = useParams();
  const projectContext = useProject();

  useEffect(() => {
    projectContext.getDeployment(deploymentId);
  }, [deploymentId]);

  return (
    <Box>
      <Typography variant="h4">Deployment</Typography>
      {projectContext.deployment && (
        <DeploymentLogs deployment={projectContext.deployment} />
      )}
    </Box>
  );
};

export default Deployment;
