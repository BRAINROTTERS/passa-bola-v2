const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware para parsear JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});