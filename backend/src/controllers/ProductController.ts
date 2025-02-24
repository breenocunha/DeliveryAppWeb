import { Request, Response } from 'express';
import pool from '../config/database';

class ProductController {
  async index(req: Request, res: Response) {
    try {
      const { category } = req.query;
      
      let query = 'SELECT * FROM products';
      const params: any[] = [];

      if (category) {
        query += ' WHERE category = $1';
        params.push(category);
      }

      query += ' ORDER BY name';
      
      const result = await pool.query(query, params);
      return res.json(result.rows);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao buscar produto' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price, image_url, category } = req.body;

      const result = await pool.query(
        `INSERT INTO products (name, description, price, image_url, category) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, description, price, image_url, category]
      );

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar produto' });
    }
  }
}

export default new ProductController(); 