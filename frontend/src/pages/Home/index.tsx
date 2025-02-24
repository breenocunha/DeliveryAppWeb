import React from 'react';
import { Typography, Button, Grid, Paper, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  LocalShipping as DeliveryIcon,
  Timer as TimerIcon,
  Restaurant as QualityIcon,
  CreditCard as PaymentIcon 
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

// Definindo interfaces para as props dos componentes estilizados
interface IconWrapperProps {
  $startColor: string;
  $endColor: string;
}

interface CategoryCardProps {
  $bgImage: string;
}

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, rgba(255, 75, 43, 0.95), rgba(255, 65, 108, 0.95)),
              url('/images/hero-bg.jpg') center/cover;
  color: white;
  padding: 6rem 0;
  margin: -24px -24px 2rem -24px;
  text-align: center;
`;

const FeatureCard = styled(Paper)`
  padding: 2rem;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled.div<IconWrapperProps>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.$startColor}, ${props => props.$endColor});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    font-size: 32px;
    color: white;
  }
`;

const CategorySection = styled(Box)`
  margin-top: 4rem;
`;

const CategoryCard = styled(Paper)<CategoryCardProps>`
  height: 200px;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url(${props => props.$bgImage}) center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

// Interfaces para os dados
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  startColor: string;
  endColor: string;
}

interface Category {
  title: string;
  image: string;
  path: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      icon: <TimerIcon />,
      title: 'Rápido',
      description: 'Entrega em até 45 minutos ou sua próxima entrega é grátis',
      startColor: '#FF4B2B',
      endColor: '#FF416C'
    },
    {
      icon: <QualityIcon />,
      title: 'Qualidade',
      description: 'Ingredientes frescos selecionados e preparo artesanal',
      startColor: '#2B7FFF',
      endColor: '#4B9FFF'
    },
    {
      icon: <DeliveryIcon />,
      title: 'Praticidade',
      description: 'Acompanhe seu pedido em tempo real pelo aplicativo',
      startColor: '#00C853',
      endColor: '#69F0AE'
    },
    {
      icon: <PaymentIcon />,
      title: 'Pagamento',
      description: 'Várias formas de pagamento, incluindo PIX e cartões',
      startColor: '#FF6D00',
      endColor: '#FFC107'
    }
  ];

  const categories: Category[] = [
    {
      title: 'Pizzas',
      image: 'https://source.unsplash.com/800x600/?pizza',
      path: '/cardapio'
    },
    {
      title: 'Hambúrgueres',
      image: 'https://source.unsplash.com/800x600/?burger',
      path: '/cardapio'
    },
    {
      title: 'Saladas',
      image: 'https://source.unsplash.com/800x600/?salad',
      path: '/cardapio'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Delivery App - Peça sua comida online</title>
        <meta 
          name="description" 
          content="Faça seu pedido online com o melhor delivery da região. Pizzas, hambúrgueres e muito mais!"
        />
      </Helmet>
      <Box sx={{ margin: '-24px' }}>
        <HeroSection>
          <Container>
            <Typography variant="h2" gutterBottom fontWeight="bold">
              Delivery App
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
              Os melhores pratos entregues na sua casa
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/cardapio')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Ver Cardápio
            </Button>
          </Container>
        </HeroSection>

        <Container>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard elevation={1}>
                  <IconWrapper 
                    $startColor={feature.startColor} 
                    $endColor={feature.endColor}
                  >
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>

          <CategorySection>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              Categorias Populares
            </Typography>
            <Grid container spacing={3}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <CategoryCard 
                    elevation={2} 
                    $bgImage={category.image}
                    onClick={() => navigate(category.path)}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {category.title}
                    </Typography>
                  </CategoryCard>
                </Grid>
              ))}
            </Grid>
          </CategorySection>
        </Container>
      </Box>
    </>
  );
};

export default Home; 