import React from 'react';
import { Backdrop, CircularProgress, Box } from '@mui/material';
import { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextData {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const showLoading = useCallback((msg?: string) => {
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setMessage(undefined);
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: 2
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        {message && (
          <Box sx={{ mt: 2, color: 'white' }}>
            {message}
          </Box>
        )}
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext); 