import { Request, Response } from 'express';
import pool from '../config/database';
import { CustomRequest } from '../types/express';

class OrderController {
  async create(req: CustomRequest, res: Response) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const { items, delivery_address, total_price } = req.body;
      const userId = req.userId;

      // Criar o pedido
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_price, delivery_address) 
         VALUES ($1, $2, $3) 
         RETURNING id`,
        [userId, total_price, delivery_address]
      );

      const orderId = orderResult.rows[0].id;

      // Inserir os itens do pedido
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.product_id, item.quantity, item.price]
        );
      }

      await client.query('COMMIT');

      return res.status(201).json({
        id: orderId,
        message: 'Pedido criado com sucesso'
      });
    } catch (err) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Erro ao criar pedido' });
    } finally {
      client.release();
    }
  }

  async listUserOrders(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId;

      const result = await pool.query(
        `SELECT o.*, 
                json_agg(json_build_object(
                  'product_id', oi.product_id,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'product', (SELECT json_build_object(
                    'name', p.name,
                    'description', p.description
                  ) FROM products p WHERE p.id = oi.product_id)
                )) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.user_id = $1
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [userId]
      );

      return res.json(result.rows);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao listar pedidos' });
    }
  }
}

export default new OrderController(); 