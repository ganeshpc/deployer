import { List } from '@mui/material';
import ProjectListItem from '../components/project/ProjectListItem';

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      name: 'Project 1',
      gitUrl: 'gitUrl1',
    },
    {
      id: 2,
      name: 'Project 2',
      gitUrl: 'gitUrl2',
    },
    {
      id: 3,
      name: 'Project 3',
      gitUrl: 'gitUrl3',
    },
  ];
  return (
    <List>
      {projects.map((project) => {
        return <ProjectListItem key={project.id} project={project} />;
      })}
    </List>
  );
};

export default ProjectList;
