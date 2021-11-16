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
    tertiary: {
      main: '#C88CE3',
    },
    darkUi: {
      main: '#39393A',
    },
    lightFont: {
      main: '#ECECEA',
    },
    shinyBlue: {
      main: '#005CE6',
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
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          margin: '0',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
  },
});

const ThemeProviderContext = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderContext;
