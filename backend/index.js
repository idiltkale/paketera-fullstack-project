require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.send('Connected to PostgreSQL ✅');
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT id, username, role FROM users');
  res.json(result.rows);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query(
    'SELECT * FROM users WHERE username=$1 AND password=$2',
    [username, password]
  );
  if (result.rows.length > 0) {
    const user = result.rows[0];
    res.json({ username: user.username, role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/product-types', async (req, res) => {
  const result = await pool.query('SELECT * FROM product_types');
  res.json(result.rows);
});

app.post('/product-types', async (req, res) => {
  const { name } = req.body;
  await pool.query('INSERT INTO product_types(name) VALUES($1)', [name]);
  res.status(201).send('Product type added');
});

app.get('/orders', async (req, res) => {
  const result = await pool.query(`
    SELECT o.id, u.username AS customer, o.created_at, 
           json_agg(json_build_object('type', pt.name, 'quantity', oi.quantity)) AS products,
           (SELECT json_agg(u2.username) 
            FROM supplier_responses sr 
            JOIN users u2 ON sr.supplier_id = u2.id 
            WHERE sr.order_id = o.id AND sr.status = 'interested') AS interested_suppliers
    FROM orders o
    JOIN users u ON o.customer_id = u.id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN product_types pt ON oi.product_type_id = pt.id
    GROUP BY o.id, u.username, o.created_at
    ORDER BY o.id
  `);
  res.json(result.rows);
});

app.post('/orders', async (req, res) => {
  const { customerUsername, products } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const customerResult = await client.query('SELECT id FROM users WHERE username=$1', [customerUsername]);
    const customerId = customerResult.rows[0].id;

    const orderResult = await client.query(
      'INSERT INTO orders(customer_id) VALUES($1) RETURNING id',
      [customerId]
    );
    const orderId = orderResult.rows[0].id;

    for (const [productType, quantity] of Object.entries(products)) {
      const typeResult = await client.query('SELECT id FROM product_types WHERE name=$1', [productType]);
      const typeId = typeResult.rows[0].id;
      await client.query(
        'INSERT INTO order_items(order_id, product_type_id, quantity) VALUES($1, $2, $3)',
        [orderId, typeId, quantity]
      );
    }

    await client.query('COMMIT');
    res.status(201).send('Order created');
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

app.post('/orders/:orderId/supplier-response', async (req, res) => {
  const { supplierUsername, interested } = req.body;
  const { orderId } = req.params;

  const supplierResult = await pool.query('SELECT id FROM users WHERE username=$1', [supplierUsername]);
  const supplierId = supplierResult.rows[0].id;

  await pool.query(`
    INSERT INTO supplier_responses(order_id, supplier_id, status)
    VALUES($1, $2, $3)
    ON CONFLICT (order_id, supplier_id) DO UPDATE SET status = EXCLUDED.status
  `, [orderId, supplierId, interested ? 'interested' : 'not_interested']);

  res.send('Response recorded');
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
