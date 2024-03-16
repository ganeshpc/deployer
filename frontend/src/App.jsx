import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, grey } from '@mui/material/colors';

import router from './routes';

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
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
