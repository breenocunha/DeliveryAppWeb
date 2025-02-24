import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import { theme } from './theme';
import { LoadingProvider } from './components/GlobalLoading';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <LoadingProvider>
                <CartProvider>
                  <BrowserRouter>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cardapio" element={<Menu />} />
                        <Route path="/carrinho" element={<Cart />} />
                        <Route path="/pedidos" element={<Orders />} />
                      </Routes>
                    </Layout>
                  </BrowserRouter>
                </CartProvider>
              </LoadingProvider>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
