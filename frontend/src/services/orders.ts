import api from './api';
import { CartItem } from '../types';

interface CreateOrderData {
  items: CartItem[];
  delivery_address: string;
  payment_method: string;
  total_price: number;
}

export const OrdersService = {
  create: async (data: CreateOrderData) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  list: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  cancel: async (id: number) => {
    const response = await api.post(`/orders/${id}/cancel`);
    return response.data;
  }
}; 