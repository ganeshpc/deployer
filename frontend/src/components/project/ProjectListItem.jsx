import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

const ProjectListItem = ({ project }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar >
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={project.name} secondary={project.gitUrl} />
        <ListItemSecondaryAction>
          <Link to={`/projects/${project.id}`}>
            <Button variant="outlined">View</Button>
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ProjectListItem;
