import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    p={3}
    textAlign="center"
  >
    <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
    <Typography color="error" gutterBottom>
      {message}
    </Typography>
    {onRetry && (
      <Button 
        onClick={onRetry}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Tentar Novamente
      </Button>
    )}
  </Box>
); 