import React, { Component, ErrorInfo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
          textAlign="center"
          p={3}
        >
          <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Ops! Algo deu errado
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Desculpe pelo inconveniente. Por favor, tente novamente.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Recarregar Página
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 