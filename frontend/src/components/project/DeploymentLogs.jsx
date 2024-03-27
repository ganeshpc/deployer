import { Box, Paper, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import useProject from '../../hooks/useProject';

const DeploymentLogs = ({ deploymentId }) => {
  const projectContext = useProject();

  useEffect(() => {
    projectContext.getDeploymentLogs(deploymentId);
  }, [deploymentId]);

  return (
    <Box marginTop={3}>
      <Typography variant="h5">Logs</Typography>
      <Box
        marginTop={3}
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: '60vh',
          overflow: 'auto',
          padding: 2,
          backgroundColor: '#1e1e2f',
          color: '#f0f0f0',
          fontFamily: 'Monaco, monospace',
          fontSize: '0.875rem',
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        }}
      >
        {projectContext.deploymentLogs &&
          projectContext.deploymentLogs.map((log) => (
            <Typography key={log.event_id} component="div" gutterBottom>
              {log.timestamp} - {log.log}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

DeploymentLogs.propTypes = {
  deploymentId: PropTypes.string.isRequired,
};

export default DeploymentLogs;
