import { CartItem } from '../types';
import { STORAGE_KEYS } from '../config/constants';

export const CartStorage = {
  save: (items: CartItem[]) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  },

  load: (): CartItem[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
  }
}; 