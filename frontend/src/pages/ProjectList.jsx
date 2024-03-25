import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, Box, List, Typography, Grid } from '@mui/material';

import ProjectListItem from '../components/project/ProjectListItem';
import useProject from '../hooks/useProject';

const ProjectList = () => {
  const projectContext = useProject();

  useEffect(() => {
    projectContext.getProjects();
  }, []);

  return (
    <Box>
      {projectContext.projects && projectContext.projects.length === 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5">No projects found</Typography>
          <Link to="/create-project">
            <Button variant="outlined">Create New Project</Button>
          </Link>
        </Grid>
      ) : (
        <>
          <Link to="/create-project">
            <Button variant="outlined">Create New Project</Button>
          </Link>
          <List>
            {projectContext.projects &&
              projectContext.projects.map((project) => {
                return <ProjectListItem key={project.id} project={project} />;
              })}
          </List>
        </>
      )}
    </Box>
  );
};

export default ProjectList;
