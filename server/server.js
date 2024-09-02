const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: 'zero',
  host: 'localhost',
  database: 'markdown_editor',
  password: 'admin@markdown',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.post('/documents', async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'INSERT INTO documents (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  res.json(result.rows[0]);
});

app.get('/documents', async (req, res) => {
  const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
  res.json(result.rows);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
