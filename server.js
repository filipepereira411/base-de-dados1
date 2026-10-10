require('dotenv').config();
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;

// Inicializa o cliente do Supabase usando as tuas chaves do .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Configurações para ler JSON e servir os ficheiros da pasta public
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. ROTA PARA LISTAR PRODUTOS (GET)
app.get('/api/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// 2. ROTA PARA LISTAR HISTÓRICO DE VENDAS (GET)
app.get('/api/vendas', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vendas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// 3. ROTA PARA REGISTAR UMA NOVA VENDA (POST)
app.post('/api/vendas', async (req, res) => {
  try {
    const { total } = req.body;
    
    const { data, error } = await supabase
      .from('vendas')
      .insert([{ total: parseFloat(total) }])
      .select();

    if (error) throw error;
    res.json({ sucesso: true, dados: data });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Inicia o servidor local
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(` Servidor a correr em: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
