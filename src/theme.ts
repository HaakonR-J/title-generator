import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: 13
        }
      }
    }
  }
});

export default theme;
