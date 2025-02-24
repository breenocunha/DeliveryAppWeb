import { Router, Response } from 'express';
import UserController from '../controllers/UserController';
import ProductController from '../controllers/ProductController';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../middlewares/auth';
import { CustomRequest } from '../types/express';

const routes = Router();

// Rotas públicas
routes.post('/users/register', UserController.register);
routes.post('/users/login', UserController.login);

// Rotas de produtos públicas
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas protegidas
routes.get('/profile', (req: CustomRequest, res: Response) => {
  return res.json({ userId: req.userId });
});

// Rotas de produtos protegidas (admin)
routes.post('/products', ProductController.create);

// Rotas de pedidos (protegidas)
routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.listUserOrders);

export default routes; 