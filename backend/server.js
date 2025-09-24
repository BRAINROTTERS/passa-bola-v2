const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let inscricoes = [];
let users = [
    { email: 'passabolaadm@fiap.com.br', password: 'PassaBola2025adm@', role: 'admin', name: 'Ale & Luana' },
    { email: 'rafael@hotmail.com', password: 'jogador', role: 'player', name: 'Rafael' },
];

app.use(cors());
app.use(express.json());

app.post('/api/inscricoes', (req, res) => {
    const novaInscricao = { ...req.body, id: Date.now().toString() };
    inscricoes.push(novaInscricao);
    console.log('Nova inscrição recebida:', novaInscricao);
    res.status(201).json({ message: 'Inscrição realizada com sucesso!', inscricoes });
});

app.get('/api/inscricoes', (req, res) => {
    res.json(inscricoes);
});

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

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.status(200).json({ role: user.role, name: user.name, email: user.email });
    } else {
        res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }
});
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Verificar se o usuário já existe
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
    
    // Criar novo usuário (como jogador por padrão)
    const newUser = { 
        email, 
        password, 
        role: 'player', 
        name 
    };
    
    users.push(newUser);
    console.log('Novo usuário registrado:', newUser);
    
    res.status(201).json({ 
        message: 'Usuário registrado com sucesso!',
        user: { email: newUser.email, name: newUser.name, role: newUser.role }
    });
});

app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});