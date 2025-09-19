const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Lista de times inscritos (simulando um banco de dados)
let inscricoes = [];

app.use(cors());
app.use(express.json());

// Endpoint para receber novas inscrições de times (público e admin)
app.post('/api/inscricoes', (req, res) => {
  const novaInscricao = { ...req.body, id: Date.now().toString() };
  inscricoes.push(novaInscricao);
  console.log('Nova inscrição recebida:', novaInscricao);
  console.log('Total de times inscritos:', inscricoes.length);
  res.status(201).json({ message: 'Inscrição realizada com sucesso!', inscricoes });
});

// Endpoint para o frontend buscar a lista de times
app.get('/api/inscricoes', (req, res) => {
  res.json(inscricoes);
});

// NOVO ENDPOINT: Excluir um time por ID
app.delete('/api/inscricoes/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = inscricoes.length;
  inscricoes = inscricoes.filter(time => time.id !== id);
  if (inscricoes.length < initialLength) {
    console.log(`Time com ID ${id} excluído.`);
    res.status(200).json({ message: 'Time excluído com sucesso.' });
  } else {
    res.status(404).json({ message: 'Time não encontrado.' });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});