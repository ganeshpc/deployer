import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

import useProject from '../../hooks/useProject';

const Deployments = ({ project }) => {
  const projectContext = useProject();

  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    projectContext
      .getDeployments(project.id)
      .then((deployments) => setDeployments(deployments));
  }, []);

  return (
    <Box>
      {deployments.length === 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5">No deployments found</Typography>
        </Grid>
      ) : (
        <List>
          {deployments.map((deployment) => {
            return (
              <DeploymentListItem key={deployment.id} deployment={deployment} />
            );
          })}
        </List>
      )}
    </Box>
  );
};

Deployments.propTypes = {
  project: PropTypes.object.isRequired,
};

const DeploymentListItem = ({ deployment }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <RocketLaunchRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h6">{deployment.subdomain} </Typography>
          }
          secondary={deployment.id}
        />
        <ListItemSecondaryAction>
          <Link to={`/deployment/${deployment.id}`}>
            <Button variant="outlined">Show Logs</Button>
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Deployments;
