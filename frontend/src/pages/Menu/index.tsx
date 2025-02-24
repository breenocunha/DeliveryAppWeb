import React, { useState, useCallback, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  CardActions,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Container,
  Chip,
  Fade,
  Skeleton
} from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';
import { 
  ShoppingCart as CartIcon,
  LocalOffer as TagIcon
} from '@mui/icons-material';
import LoadingSkeleton from '../../components/LoadingSkeleton';

interface PriceTagProps {
  $visible: boolean;
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-radius: 16px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);

    .card-media::after {
      opacity: 0.7;
    }

    .price-tag {
      transform: translateX(0);
    }
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 240px;
  position: relative;

  &.card-media::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
`;

const PriceTag = styled(Box)<PriceTagProps>`
  position: absolute;
  top: 16px;
  right: 0;
  background: linear-gradient(135deg, #FF4B2B, #FF416C);
  color: white;
  padding: 8px 16px;
  border-radius: 20px 0 0 20px;
  font-weight: 600;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1;

  &.price-tag {
    transform: translateX(${props => props.$visible ? '0' : '100%'});
  }
`;

const CategoryChip = styled(Chip)`
  margin: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }

  &.active {
    background: linear-gradient(135deg, #FF4B2B, #FF416C);
    color: white;
  }
`;

const ProductTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 8px;
`;

const ProductDescription = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AddToCartButton = styled(Button)`
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
`;

// Adicionar interface para Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

// Adicionar interface ProductCardProps
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Memoizar componentes que recebem props
const ProductCard = React.memo(({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Fade in={true} timeout={500}>
      <StyledCard>
        <PriceTag className="price-tag" $visible={true}>
          R$ {product.price.toFixed(2)}
        </PriceTag>
        <StyledCardMedia
          className="card-media"
          image={product.image_url}
          title={product.name}
        />
        <CardContent>
          <ProductTitle variant="h6">
            {product.name}
          </ProductTitle>
          <ProductDescription variant="body2">
            {product.description}
          </ProductDescription>
          <Chip 
            label={product.category}
            size="small"
            sx={{ backgroundColor: 'rgba(255, 75, 43, 0.1)', color: 'primary.main' }}
          />
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <AddToCartButton
            aria-label={`Adicionar ${product.name} ao carrinho`}
            fullWidth
            startIcon={<CartIcon sx={{ color: 'white' }} />}
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao Carrinho
          </AddToCartButton>
        </CardActions>
      </StyledCard>
    </Fade>
  );
});

const Menu: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToCart } = useCart();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mover useCallback para antes do if
  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    setSnackbarOpen(true);
  }, [addToCart]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Tipar os produtos mockados
  const products: Product[] = [
    {
      id: 1,
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco',
      price: 45.90,
      image_url: 'https://media.istockphoto.com/id/1327326168/pt/foto/pizza-pepperoni-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=pcAWsVfiNGl_gdiR70JBnLLweNu6NmYqiBNEeNEyF0k=',
      category: 'Pizzas'
    },
    {
      id: 2,
      name: 'Hambúrguer Clássico',
      description: 'Pão, hambúrguer, queijo, alface, tomate',
      price: 32.90,
      image_url: 'https://cdn.pixabay.com/photo/2022/07/15/18/17/spicy-burger-7323694_1280.jpg',
      category: 'Hambúrgueres'
    },
    {
      id: 3,
      name: 'Salada Caesar',
      description: 'Alface romana, croutons, parmesão, molho caesar',
      price: 28.90,
      image_url: 'https://cdn.pixabay.com/photo/2017/08/11/00/32/salad-2629262_1280.jpg',
      category: 'Saladas'
    }
  ];

  // Nova lógica para categorias sem usar Set
  const categories = ['all', ...products
    .map(p => p.category)
    .filter((category, index, array) => array.indexOf(category) === index)
  ];
  
  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Cardápio
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Escolha seus pratos favoritos e receba em casa
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
        {categories.map(category => (
          <CategoryChip
            aria-label={`Filtrar por ${category}`}
            role="button"
            key={category}
            label={category === 'all' ? 'Todos' : category}
            onClick={() => setCurrentCategory(category)}
            className={currentCategory === category ? 'active' : ''}
            icon={<TagIcon />}
          />
        ))}
      </Box>

      <Grid container spacing={isMobile ? 2 : 3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          variant="filled"
          sx={{
            background: 'linear-gradient(135deg, #FF4B2B, #FF416C)',
          }}
        >
          Item adicionado ao carrinho!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Menu; 