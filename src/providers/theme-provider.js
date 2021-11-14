import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#63B0CD',
    },
    secondary: {
      main: '#E86F5C',
    },
    darkUi: {
      main: '#39393A',
    },
    lightFont: {
      main: '#ECECEA',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 8,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fill: '#ECECEA',
        },
      },
    },
  },
});

const ThemeProviderContext = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderContext;
