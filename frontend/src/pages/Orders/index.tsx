import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Box,
  Collapse,
  IconButton,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  AccessTime as TimeIcon,
  LocalShipping as DeliveryIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const OrdersContainer = styled(Paper)`
  padding: 2rem;
  margin-top: 2rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const StatusChip = styled(Chip)<{ $status: string }>`
  background-color: ${props => 
    props.$status === 'pending' ? '#ffd700' :
    props.$status === 'preparing' ? '#1e90ff' :
    props.$status === 'delivering' ? '#ff8c00' :
    props.$status === 'delivered' ? '#32cd32' : '#ff6347'};
  color: white;
`;

const OrderCard = styled(Card)`
  margin-bottom: 1rem;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const ItemRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  deliveryAddress: string;
  estimatedTime?: string;
}

const Orders: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Dados mockados - depois substituiremos por dados da API
  const orders: Order[] = [
    {
      id: 1,
      date: '2024-02-23 15:30',
      status: 'delivered',
      total: 78.80,
      estimatedTime: '45-60 min',
      deliveryAddress: 'Rua Example, 123 - Bairro, Cidade',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 45.90 },
        { name: 'Refrigerante', quantity: 2, price: 16.45 }
      ]
    },
    {
      id: 2,
      date: '2024-02-23 16:45',
      status: 'preparing',
      total: 32.90,
      estimatedTime: '30-45 min',
      deliveryAddress: 'Av. Sample, 456 - Bairro, Cidade',
      items: [
        { name: 'Hambúrguer Clássico', quantity: 1, price: 32.90 }
      ]
    }
  ];

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'Pendente',
      preparing: 'Preparando',
      delivering: 'Em entrega',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <OrdersContainer>
      <Typography variant="h4" gutterBottom>
        Meus Pedidos
      </Typography>

      {orders.map((order) => (
        <OrderCard key={order.id}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Pedido #{order.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(order.date)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} textAlign={isMobile ? 'left' : 'center'}>
                <StatusChip
                  $status={order.status}
                  label={getStatusText(order.status)}
                  icon={<TimeIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={4} textAlign={isMobile ? 'left' : 'right'}>
                <Typography variant="h6">
                  R$ {order.total.toFixed(2)}
                </Typography>
                <IconButton
                  onClick={() => setExpandedOrder(
                    expandedOrder === order.id ? null : order.id
                  )}
                  size="small"
                >
                  {expandedOrder === order.id ? 
                    <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Grid>
            </Grid>

            <Collapse in={expandedOrder === order.id}>
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Itens do Pedido:
                </Typography>
                {order.items.map((item, index) => (
                  <ItemRow key={index}>
                    <Typography variant="body2">
                      {item.quantity}x {item.name}
                    </Typography>
                    <Typography variant="body2">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ItemRow>
                ))}

                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    <DeliveryIcon fontSize="small" /> Endereço de Entrega:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {order.deliveryAddress}
                  </Typography>
                </Box>

                {order.estimatedTime && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" gutterBottom>
                      <TimeIcon fontSize="small" /> Tempo Estimado:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {order.estimatedTime}
                    </Typography>
                  </Box>
                )}

                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    <MoneyIcon fontSize="small" /> Resumo do Pagamento:
                  </Typography>
                  <ItemRow>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2">
                      R$ {order.total.toFixed(2)}
                    </Typography>
                  </ItemRow>
                  <ItemRow>
                    <Typography variant="body2">Taxa de Entrega:</Typography>
                    <Typography variant="body2">R$ 5,00</Typography>
                  </ItemRow>
                  <ItemRow>
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1">
                      R$ {(order.total + 5).toFixed(2)}
                    </Typography>
                  </ItemRow>
                </Box>
              </Box>
            </Collapse>
          </CardContent>
        </OrderCard>
      ))}
    </OrdersContainer>
  );
};

export default Orders; 