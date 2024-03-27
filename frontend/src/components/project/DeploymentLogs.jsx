import { Box, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const DeploymentLogs = ({ deployment }) => {
  return (
    <Box marginTop={3}>
      <Typography variant="h5">Deployment Logs</Typography>
      <pre>{deployment.logs}</pre>
    </Box>
  );
};

DeploymentLogs.propTypes = {
  deployment: PropTypes.object.isRequired,
};

export default DeploymentLogs;
