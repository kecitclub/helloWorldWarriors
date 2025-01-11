// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#802000', 
    },
    secondary: {
      main: '#cc0000', 
    },
    background: {
      default: '#f2f2f2', // Set your desired background color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
