import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Restaurant as RestaurantIcon,
  RestaurantMenu as MenuBookIcon,
  Receipt as OrdersIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.palette.primary.main};
  }
`;

const CartButton = styled(Button)`
  position: relative;
  border-radius: 12px;
  
  @media (max-width: 600px) {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 1000;
    border-radius: 50%;
    min-width: 56px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%);
    box-shadow: 0 4px 12px rgba(255, 75, 43, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
      box-shadow: 0 6px 16px rgba(255, 75, 43, 0.4);
    }
  }
`;

const CartBadge = styled(Badge)`
  & .MuiBadge-badge {
    background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
    color: white;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    font-size: 0.75rem;
  }
`;

const LogoText = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${props => props.theme.palette.primary.main};
  
  svg {
    font-size: 2rem;
  }
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%);
    border-right: none;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { text: 'Início', icon: <HomeIcon />, path: '/' },
    { text: 'Cardápio', icon: <MenuBookIcon />, path: '/cardapio' },
    { text: 'Meus Pedidos', icon: <OrdersIcon />, path: '/pedidos' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <StyledLink to="/">
                <LogoText variant="h6">
                  <RestaurantIcon /> Delivery App
                </LogoText>
              </StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/">
                <LogoText variant="h6">
                  <RestaurantIcon /> Delivery App
                </LogoText>
              </StyledLink>
              <NavLinks>
                <Button color="inherit" component={RouterLink} to="/cardapio">
                  Cardápio
                </Button>
                <Button color="inherit" component={RouterLink} to="/pedidos">
                  Meus Pedidos
                </Button>
              </NavLinks>
            </>
          )}
          
          <StyledLink to="/carrinho">
            <CartButton 
              color="inherit" 
              variant={isMobile ? "contained" : "text"}
            >
              <CartBadge badgeContent={itemCount} color="error">
                <CartIcon />
              </CartBadge>
              {!isMobile && ` Carrinho (${itemCount})`}
            </CartButton>
          </StyledLink>
        </StyledToolbar>
      </StyledAppBar>

      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </StyledDrawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: '64px',
          mb: isMobile ? '80px' : '20px',
          background: 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)'
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout; 