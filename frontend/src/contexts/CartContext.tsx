import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { ErrorMessage } from '../components/ErrorMessage';
import { CartStorage } from '../services/cartStorage';
import { APP_CONFIG } from '../config/constants';

interface CartContextData {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  total: number;
  deliveryFee: number;
  finalTotal: number;
  decrementQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => CartStorage.load());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    CartStorage.save(items);
  }, [items]);

  const addToCart = useCallback(async (product: Product) => {
    try {
      setItems(current => {
        const existingItem = current.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return current.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...current, { product, quantity: 1 }];
      });
    } catch (err) {
      setError('Erro ao adicionar item ao carrinho');
      console.error(err);
    }
  }, []);

  const decrementQuantity = (productId: number) => {
    setItems(current =>
      current.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setItems(current =>
      current.filter(item => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee = total >= APP_CONFIG.MIN_ORDER_VALUE ? 0 : APP_CONFIG.DELIVERY_FEE;
  const finalTotal = total + deliveryFee;

  if (error) {
    return <ErrorMessage message={error} onRetry={() => setError(null)} />;
  }

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      total,
      deliveryFee,
      finalTotal,
      decrementQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 