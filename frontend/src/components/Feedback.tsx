import React from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';

interface FeedbackProps extends Omit<AlertProps, 'children'> {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Feedback: React.FC<FeedbackProps> = ({
  open,
  message,
  onClose,
  duration = 3000,
  severity = 'success',
  ...props
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          background: severity === 'success' 
            ? 'linear-gradient(135deg, #FF4B2B, #FF416C)'
            : undefined
        }}
        {...props}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback; 