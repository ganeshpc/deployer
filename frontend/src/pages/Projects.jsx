import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import  FolderIcon  from '@mui/icons-material/Folder';

const Projects = () => {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project 1" secondary="git Url" />
      </ListItem>
      <Divider />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project 2" secondary="git Url" />
      </ListItem>
    </List>
  );
};

export default Projects;
