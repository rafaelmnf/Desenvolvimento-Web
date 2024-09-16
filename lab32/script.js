let timerInterval; // Variável para armazenar o intervalo do temporizador
const timePerQuestion = 15; // Tempo em segundos para cada pergunta

function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${q.question}</h3>
            <div id="timer-${index}" class="timer">15</div>
        `;
        q.answers.forEach((answer, i) => {
            div.innerHTML += `<label id="questoes">
                <input type="radio" name="question${index}" value="${i}"> ${answer}
            </label><br>`;
        });
        questionContainer.appendChild(div);
    });
    startTimers(); // Inicia os temporizadores quando as perguntas são carregadas
}

function startTimers() {
    let currentIndex = 0;
    const timers = document.querySelectorAll('.timer');

    function updateTimer() {
        if (currentIndex < timers.length) {
            let timeLeft = parseInt(timers[currentIndex].textContent);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timers[currentIndex].textContent = 'Tempo Esgotado';
                currentIndex++;
                startTimers(); // Avança para o próximo temporizador
            } else {
                timers[currentIndex].textContent = timeLeft - 1;
            }
        }
    }

    timerInterval = setInterval(updateTimer, 1000);
}

function enviarRespostas() {
    clearInterval(timerInterval); // Para o temporizador quando as respostas são enviadas
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++;
        }
    });
    document.getElementById('resultado').innerHTML = `Você marcou ${score} de ${questions.length}`;
}

window.onload = loadQuestions;