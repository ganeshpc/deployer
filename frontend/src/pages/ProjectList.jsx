import { useEffect } from 'react';

import { List } from '@mui/material';

import ProjectListItem from '../components/project/ProjectListItem';
import useProject from '../hooks/useProject';
import useAuth from '../hooks/useAuth';

const ProjectList = () => {
  const projectContext = useProject();

  useEffect(() => {
      projectContext.getProjects();
  }, []);

  return (
    <List>
      {projectContext.projects && projectContext.projects.map((project) => {
        return <ProjectListItem key={project.id} project={project} />;
      })}
    </List>
  );
};

export default ProjectList;
