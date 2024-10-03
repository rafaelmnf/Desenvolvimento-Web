document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const verificationForm = document.getElementById('verificationForm');

    // Inicialmente esconde o formulário de verificação
    verificationForm.style.display = 'none';

    // Submeter formulário de contato
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        

        try {
            // Envia a requisição para o servidor
            const response = await fetch('/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.ok) {
                // Esconde o formulário de contato e exibe o de verificação
                contactForm.style.display = 'none';
                verificationForm.style.display = 'block';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error);
        }
    });

    // Submeter formulário de verificação
    verificationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value; // Email original
        const code = document.getElementById('verificationCode').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code })
            });

            const result = await response.json();

            if (response.ok) {
                // Após a verificação bem-sucedida, envia a mensagem original
                await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message })
                });
                alert('Mensagem enviada com sucesso!');
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro ao verificar o código:', error);
        }
    });
});
