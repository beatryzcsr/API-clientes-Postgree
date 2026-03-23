require('dotenv').config();

const express = require('express');
const app = express();

// Porta vem do .env, ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

app.use(express.json());


//rotas
const clientesRoutes = require('./routes/clientesRoutes');
app.use('/clientes', clientesRoutes);

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Clientes com PostgreSQL',
    banco: 'PostgreSQL'
  });
});


//iniciando
app.listen(PORT, () => {
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
});
