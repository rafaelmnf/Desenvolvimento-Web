const nodemailer = require("nodemailer");

// Cria o transportador usando SMTP do Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // usa o serviço Gmail
  auth: {
    user: "rafaelnfilho@gmail.com", // seu email do Gmail
    pass: "suasenhaouapppassword", // sua senha do Gmail ou senha de app (App Password)
  },
});

// Função principal para enviar o e-mail

async function main() {
  // Envia o e-mail com o objeto transportador definido
  const info = await transporter.sendMail({
    from: '"Seu Nome" <seuemail@gmail.com>', // endereço do remetente
    to: "destinatario@example.com", // lista de destinatários
    subject: "Assunto do Email", // Assunto do e-mail
    text: "Corpo do email em texto simples", // corpo do e-mail em texto
    html: "<b>Corpo do email em HTML</b>", // corpo do e-mail em HTML
  });

  console.log("E-mail enviado: %s", info.messageId);
  // Exemplo de resposta: <b658f8d769f2-54cf7e1-67c2fd@xxx.gmail.com>
}

main().catch(console.error);
