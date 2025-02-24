import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Grid,
  InputAdornment
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  LocationCity as CityIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const DeliveryContainer = styled(Box)`
  padding: 2rem;
  background: ${props => props.theme.palette.background.paper};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const FormTitle = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.palette.primary.main};
  
  svg {
    font-size: 1.5rem;
  }
`;

interface DeliverySectionProps {
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    reference: string;
  };
  setAddress: (field: string, value: string) => void;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({ address, setAddress }) => {
  return (
    <DeliveryContainer>
      <FormTitle variant="h5">
        <LocationIcon color="primary" />
        Endereço de Entrega
      </FormTitle>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Rua"
            value={address.street}
            onChange={(e) => setAddress('street', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Número"
            value={address.number}
            onChange={(e) => setAddress('number', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Complemento"
            value={address.complement}
            onChange={(e) => setAddress('complement', e.target.value)}
            placeholder="Apto, Bloco, etc."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bairro"
            value={address.neighborhood}
            onChange={(e) => setAddress('neighborhood', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CityIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cidade"
            value={address.city}
            onChange={(e) => setAddress('city', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Ponto de Referência"
            value={address.reference}
            onChange={(e) => setAddress('reference', e.target.value)}
            placeholder="Ex: Próximo ao mercado..."
          />
        </Grid>
      </Grid>
    </DeliveryContainer>
  );
};

export default DeliverySection; 