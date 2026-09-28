const express = require('express');
const app = express();

// OBRIGATÓRIO: Habilita o Express a ler JSON no corpo da requisição (req.body)
app.use(express.json());

// Parte 1.
app.get('/ingressos/:codigo', (req, res) => {
    const { codigo } = req.params; // Extrai o código da URL

    // Validação específica da atividade: Se código for '0000', erro do cliente (400)
    if (codigo === '0000') {
        return res.status(400).json({ erro: "Código de ingresso inválido." });
    }

    // Sucesso ao validar ingresso -> 200 OK
    res.status(200).json({ 
        codigo, 
        status: "VÁLIDO", 
        setor: "Pista VIP" 
    });
});

// parte 2.
app.get('/ingressos', (req, res) => {
    const { setor, tipo } = req.query; // Extrai query params opcionais

    res.status(200).json({
        mensagem: "Busca de ingressos realizada com sucesso",
        filtrosAplicados: {
            setor: setor || "Todos",
            tipo: tipo || "Todos"
        }
    });
});

// Parte 3.
app.post('/ingressos', (req, res) => {
    const { evento, preco, setor } = req.body;

    // Validação dos campos obrigatórios (Erro do Cliente -> 400)
    if (!evento || !preco) {
        return res.status(400).json({ 
            erro: "Dados incompletos! É obrigatório informar 'evento' e 'preco'." 
        });
    }

    // Sucesso ao criar novo recurso -> 201 Created
    res.status(201).json({
        mensagem: "Ingresso cadastrado com sucesso!",
        ingressoCriado: { 
            id: Math.floor(Math.random() * 1000), 
            evento, 
            preco, 
            setor: setor || "Pista" 
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor de Ingressos a rodar em: http://localhost:${PORT}`);
});

