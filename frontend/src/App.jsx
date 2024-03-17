import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, grey } from '@mui/material/colors';

import router from './routes';
import { JWTProvider as AuthProvider } from './contexts/JWTContext';
import { ProjectProvider } from './contexts/ProjectContext';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: brown[800],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ProjectProvider>
          <RouterProvider router={router} />;
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
