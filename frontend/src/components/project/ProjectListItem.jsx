import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const ProjectListItem = ({ project }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={project.name} secondary={project.gitUrl} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ProjectListItem;
