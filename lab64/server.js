const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api', (req, res) => {
    const data = {
        nome: "Servidor Node.js com Express",
        linguagem: "JavaScript",
        uso: "Desenvolvimento Web"
    };
    res.status(200).json(data); // Envia a resposta JSON
});

// Rota GET para a página de upload
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
  });
  
  // Rota POST para lidar com o upload de arquivos
  app.post('/upload', (req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        let fileData = '';
        req.on('data', chunk => {
            fileData += chunk.toString();
        });
        req.on('end', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('Upload simulado com sucesso!');
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Rota não encontrada');
    }
  });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});