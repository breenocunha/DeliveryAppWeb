export const APP_CONFIG = {
  NAME: 'Delivery App',
  DESCRIPTION: 'Os melhores pratos entregues na sua casa',
  DELIVERY_FEE: 5.00,
  MIN_ORDER_VALUE: 20.00,
  CONTACT: {
    PHONE: '(11) 99999-9999',
    EMAIL: 'contato@deliveryapp.com',
    ADDRESS: 'Rua Example, 123 - São Paulo/SP'
  },
  SOCIAL_MEDIA: {
    INSTAGRAM: 'https://instagram.com/deliveryapp',
    FACEBOOK: 'https://facebook.com/deliveryapp',
    TWITTER: 'https://twitter.com/deliveryapp'
  }
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

export const STORAGE_KEYS = {
  TOKEN: '@DeliveryApp:token',
  USER: '@DeliveryApp:user',
  CART: '@DeliveryApp:cart'
}; 