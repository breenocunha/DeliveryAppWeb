import React, { useState } from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Button,
  Divider,
  Paper,
  Box,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Payment as PaymentIconMui,
  CheckCircle as ConfirmIcon,
  LocationOn as LocationOnIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';
import PaymentSection from './components/PaymentSection';
import DeliverySection from './components/DeliverySection';
import OrderSummary from './components/OrderSummary';
import { validateCreditCardNumber } from '../../utils/validators';

const CartContainer = styled(Paper)`
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  background: white;
  
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const StyledStepper = styled(Stepper)`
  margin-bottom: 2rem;
  
  .MuiStepLabel-root.Mui-active {
    color: ${props => props.theme.palette.primary.main};
  }
  
  .MuiStepIcon-root.Mui-active {
    color: ${props => props.theme.palette.primary.main};
  }
  
  .MuiStepIcon-root.Mui-completed {
    color: ${props => props.theme.palette.primary.main};
  }
`;

const ProductImage = styled(CardMedia)`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin-right: 16px;
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const QuantityControl = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.palette.grey[100]};
  border-radius: 20px;
  padding: 4px;
`;

const TotalSection = styled(Box)`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.palette.grey[50]};
  border-radius: 12px;
`;

const ActionButton = styled(Button)`
  background: linear-gradient(135deg, #FF4B2B, #FF416C);
  color: white !important;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  text-transform: none;
  
  &:hover {
    background: linear-gradient(135deg, #FF416C, #FF4B2B);
    box-shadow: 0 4px 12px rgba(255, 75, 43, 0.3);
  }

  svg {
    color: white;
  }
`;

const EmptyCartContainer = styled(Box)`
  text-align: center;
  padding: 3rem;
  
  svg {
    font-size: 64px;
    color: ${props => props.theme.palette.grey[300]};
    margin-bottom: 1rem;
  }
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
`;

interface AddressData {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  reference: string;
}

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const Cart: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items, removeFromCart, addToCart, total, decrementQuantity } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  
  // Estado para endereço
  const [address, setAddress] = useState<AddressData>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    reference: ''
  });

  // Estado para pagamento
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [addressError, setAddressError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const steps = [
    { label: 'Carrinho', icon: <CartIcon /> },
    { label: 'Endereço', icon: <LocationOnIcon /> },
    { label: 'Pagamento', icon: <PaymentIconMui /> },
    { label: 'Confirmação', icon: <ConfirmIcon /> }
  ];

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleCardDataChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateAddress()) {
      return;
    }
    if (activeStep === 2 && !validatePayment()) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const validateAddress = () => {
    const required = ['street', 'number', 'neighborhood', 'city'];
    const hasAllRequired = required.every(field => 
      address[field as keyof AddressData]?.trim()
    );
    
    if (!hasAllRequired) {
      setAddressError('Preencha todos os campos obrigatórios');
      return false;
    }
    
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'credit') {
      const required = ['number', 'name', 'expiry', 'cvv'];
      const hasAllRequired = required.every(field => 
        cardData[field as keyof CardData]?.trim()
      );
      
      if (!hasAllRequired) {
        setPaymentError('Preencha todos os dados do cartão');
        return false;
      }
      
      // Validar formato do cartão
      if (!validateCreditCardNumber(cardData.number)) {
        setPaymentError('Número de cartão inválido');
        return false;
      }
    }
    return true;
  };

  const handleFinish = async () => {
    try {
      // Implementar lógica de finalização do pedido
      const orderData = {
        items,
        address,
        payment: {
          method: paymentMethod,
          ...(paymentMethod === 'credit' && { cardData }),
        },
        total: total + 5 // incluindo taxa de entrega
      };
      
      console.log('Finalizando pedido:', orderData);
      // Aqui você chamaria sua API
      
      // Feedback de sucesso
      // Limpar carrinho
      // Redirecionar para página de sucesso
    } catch (error) {
      // Tratamento de erro
    }
  };

  if (items.length === 0) {
    return (
      <EmptyCartContainer>
        <CartIcon />
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Seu carrinho está vazio
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Adicione itens do nosso cardápio para fazer seu pedido
        </Typography>
        <StyledLink to="/cardapio">
          <ActionButton 
            startIcon={<RestaurantIcon />}
          >
            Ver Cardápio
          </ActionButton>
        </StyledLink>
      </EmptyCartContainer>
    );
  }

  return (
    <Container maxWidth="lg">
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={() => step.icon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>

      <CartContainer elevation={0}>
        {activeStep === 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Seu Carrinho
            </Typography>
            <List>
              {items.map((item) => (
                <React.Fragment key={item.product.id}>
                  <ListItem 
                    sx={{ 
                      py: 2,
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? 2 : 0
                    }}
                  >
                    <Box display="flex" alignItems="center" width={isMobile ? '100%' : 'auto'}>
                      <ProductImage
                        image={item.product.image_url}
                        title={item.product.name}
                      />
                      <ListItemText
                        primary={item.product.name}
                        secondary={`R$ ${item.product.price.toFixed(2)}`}
                      />
                    </Box>
                    
                    <Box 
                      display="flex" 
                      alignItems="center"
                      justifyContent={isMobile ? 'space-between' : 'flex-end'}
                      width={isMobile ? '100%' : 'auto'}
                      gap={2}
                    >
                      <QuantityControl>
                        <IconButton 
                          size="small"
                          onClick={() => {
                            if (item.quantity > 1) {
                              decrementQuantity(item.product.id);
                            }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => addToCart(item.product)}
                        >
                          <AddIcon />
                        </IconButton>
                      </QuantityControl>
                      
                      <Typography variant="subtitle1">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                      
                      <IconButton 
                        edge="end" 
                        onClick={() => removeFromCart(item.product.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </>
        )}

        {activeStep === 1 && (
          <DeliverySection 
            address={address}
            setAddress={handleAddressChange}
          />
        )}

        {activeStep === 2 && (
          <PaymentSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardData={cardData}
            setCardData={handleCardDataChange}
          />
        )}

        {activeStep === 3 && (
          <OrderSummary
            items={items}
            address={address}
            payment={{
              method: paymentMethod,
              ...(paymentMethod === 'credit' && { cardData })
            }}
            total={total}
          />
        )}
        
        <TotalSection>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">Taxa de Entrega:</Typography>
              <Typography variant="h6">Total:</Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="body1">R$ {total.toFixed(2)}</Typography>
              <Typography variant="body1">R$ 5,00</Typography>
              <Typography variant="h6">R$ {(total + 5).toFixed(2)}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={2}>
            {activeStep > 0 && (
              <Button 
                onClick={() => setActiveStep(prev => prev - 1)}
                variant="outlined"
              >
                Voltar
              </Button>
            )}
            <ActionButton 
              fullWidth={activeStep === 0}
              onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
              disabled={
                (activeStep === 1 && !validateAddress()) ||
                (activeStep === 2 && !validatePayment())
              }
              sx={{
                '&.Mui-disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26) !important'
                }
              }}
            >
              {activeStep === steps.length - 1 ? 'Finalizar Pedido' : 'Continuar'}
            </ActionButton>
          </Box>
        </TotalSection>

        {addressError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {addressError}
          </Typography>
        )}

        {paymentError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {paymentError}
          </Typography>
        )}
      </CartContainer>
    </Container>
  );
};

export default Cart; 