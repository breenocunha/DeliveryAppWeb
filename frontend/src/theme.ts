import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4B2B',
      light: '#FF6B4B',
      dark: '#E63A1A',
      contrastText: '#fff'
    },
    secondary: {
      main: '#2B7FFF',
      light: '#4B9FFF',
      dark: '#1A60E6',
      contrastText: '#fff'
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF'
    },
    grey: {
      50: '#F8F9FA',
      100: '#F1F3F5',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#868E96',
      700: '#495057',
      800: '#343A40',
      900: '#212529'
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2D3748',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '8px 16px'
        },
        contained: {
          boxShadow: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.08)',
          borderRadius: '16px'
        }
      }
    }
  }
});

// Adiciona tipagem para o styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    palette: typeof theme.palette;
    typography: typeof theme.typography;
    shape: typeof theme.shape;
  }
} 