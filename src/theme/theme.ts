import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
 typography: {
  fontFamily: '"Inter", sans-serif',
  allVariants: {
   color: '#fff',
  },
 },
 palette: {
  primary: {
   main: '#1976d2',
  },
  secondary: {
   main: '#f50057',
  },
 },
});
