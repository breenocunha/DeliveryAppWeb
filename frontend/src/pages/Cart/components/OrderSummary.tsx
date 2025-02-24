import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  Grid,
  Paper,
  Chip
} from '@mui/material';
import { 
  LocalShipping as DeliveryIcon,
  Payment as PaymentIcon,
  ShoppingBasket as OrderIcon,
  CheckCircle as ConfirmIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { CartItem } from '../../../types';

const SummaryContainer = styled(Paper)`
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const SectionTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.palette.primary.main};
  
  svg {
    font-size: 1.5rem;
  }
`;

const ItemCard = styled(Box)`
  padding: 1rem;
  background: ${props => props.theme.palette.grey[50]};
  border-radius: 8px;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusChip = styled(Chip)`
  background: linear-gradient(135deg, #FF4B2B, #FF416C);
  color: white;
  font-weight: 500;
  margin-left: auto;
`;

interface OrderSummaryProps {
  items: CartItem[];
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
  };
  payment: {
    method: string;
    cardData?: {
      number: string;
    };
  };
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  address,
  payment,
  total
}) => {
  const formatAddress = () => {
    const parts = [
      address.street,
      address.number,
      address.complement,
      address.neighborhood,
      address.city
    ].filter(Boolean);
    return parts.join(', ');
  };

  const formatPaymentMethod = () => {
    switch (payment.method) {
      case 'credit':
        return `Cartão de Crédito (${payment.cardData?.number.slice(-4)})`;
      case 'debit':
        return 'Cartão de Débito';
      case 'pix':
        return 'PIX';
      default:
        return 'Dinheiro';
    }
  };

  return (
    <SummaryContainer>
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Resumo do Pedido
        </Typography>
        <StatusChip 
          icon={<ConfirmIcon />}
          label="Confirmação"
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionTitle>
            <OrderIcon />
            <Typography variant="h6">Itens do Pedido</Typography>
          </SectionTitle>
          {items.map((item) => (
            <ItemCard key={item.product.id}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="subtitle1">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantidade: {item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography variant="subtitle1" color="primary">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </ItemCard>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <SectionTitle>
            <DeliveryIcon />
            <Typography variant="h6">Endereço de Entrega</Typography>
          </SectionTitle>
          <Typography variant="body1">
            {formatAddress()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <SectionTitle>
            <PaymentIcon />
            <Typography variant="h6">Forma de Pagamento</Typography>
          </SectionTitle>
          <Typography variant="body1">
            {formatPaymentMethod()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box bgcolor={theme => theme.palette.grey[50]} p={2} borderRadius={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">Taxa de Entrega:</Typography>
                <Typography variant="h6" mt={1}>Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">
                  R$ {total.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  R$ 5,00
                </Typography>
                <Typography variant="h6" color="primary" mt={1}>
                  R$ {(total + 5).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </SummaryContainer>
  );
};

export default OrderSummary; 