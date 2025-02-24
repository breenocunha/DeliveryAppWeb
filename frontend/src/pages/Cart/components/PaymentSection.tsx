import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Collapse,
  InputAdornment
} from '@mui/material';
import {
  CreditCard as CardIcon,
  AccountBalance as PixIcon,
  AttachMoney as CashIcon,
  Event as DateIcon,
  Lock as SecurityIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const PaymentContainer = styled(Box)`
  padding: 2rem;
  background: ${props => props.theme.palette.background.paper};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const PaymentMethod = styled(FormControlLabel)`
  margin: 0.5rem 0;
  padding: 1rem;
  width: 100%;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.palette.action.hover};
  }
  
  &.Mui-checked {
    background: ${props => props.theme.palette.primary.light}10;
  }
`;

const PaymentIcon = styled(Box)<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.$color};
  color: white;
`;

const CardForm = styled(Box)`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 12px;
  background: ${props => props.theme.palette.grey[50]};
`;

interface PaymentSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  cardData: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
  setCardData: (field: string, value: string) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  cardData,
  setCardData
}) => {
  return (
    <PaymentContainer>
      <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CardIcon /> Forma de Pagamento
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <PaymentMethod
          value="credit"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center">
              <PaymentIcon $color="#FF4B2B">
                <CardIcon />
              </PaymentIcon>
              <Typography>Cartão de Crédito</Typography>
            </Box>
          }
        />

        <Collapse in={paymentMethod === 'credit'}>
          <CardForm>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número do Cartão"
                  value={cardData.number}
                  onChange={(e) => setCardData('number', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CardIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome no Cartão"
                  value={cardData.name}
                  onChange={(e) => setCardData('name', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Validade"
                  placeholder="MM/AA"
                  value={cardData.expiry}
                  onChange={(e) => setCardData('expiry', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => setCardData('cvv', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardForm>
        </Collapse>

        <PaymentMethod
          value="pix"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center">
              <PaymentIcon $color="#2B7FFF">
                <PixIcon />
              </PaymentIcon>
              <Typography>PIX</Typography>
            </Box>
          }
        />

        <PaymentMethod
          value="cash"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center">
              <PaymentIcon $color="#00C853">
                <CashIcon />
              </PaymentIcon>
              <Typography>Dinheiro</Typography>
            </Box>
          }
        />
      </RadioGroup>
    </PaymentContainer>
  );
};

export default PaymentSection; 