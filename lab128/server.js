// Dependências
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


let verificationCodes = {}; // Objeto para armazenar códigos temporariamente

// Configurando o nodemailer para enviar e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha-app' // Use uma senha de app, não a senha principal
  }
});

// Rota para mostrar a tela de contato
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

// Rota para enviar o código de verificação
app.post('/send-verification-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório' });
  }

  // Gerar um código de verificação simples (ex: 6 dígitos)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // Enviar e-mail com o código de verificação
  transporter.sendMail({
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${verificationCode}`
  }, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao enviar o e-mail' });
    }

    // Armazenar o código e o e-mail no servidor temporariamente
    verificationCodes[email] = verificationCode;

    return res.status(200).json({ message: 'Código de verificação enviado!' });
  });
});

// Rota para verificar o código inserido pelo usuário
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'E-mail e código são obrigatórios' });
  }

  // Verificar se o código informado está correto
  if (verificationCodes[email] && verificationCodes[email] == code) {
    return res.status(200).json({ message: 'Verificação bem-sucedida!' });
  } else {
    return res.status(400).json({ message: 'Código de verificação incorreto.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
