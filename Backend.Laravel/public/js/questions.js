document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-question-btn');
    const questionsList = document.getElementById('questions-list');
    const questionsContainer = document.querySelector('.questions-container');
    let questionCount = 0;
    const maxQuestions = 16;

    addButton.addEventListener('click', function() {
        // Показываем контейнер при первом клике
        if (questionsContainer.style.display === 'none') {
            questionsContainer.style.display = 'block';
        }

        if (questionCount >= maxQuestions) {
            alert('Максимальное количество вопросов - ' + maxQuestions);
            return;
        }

        questionCount++;
        
        const newQuestion = document.createElement('li');
        newQuestion.className = 'question';
        newQuestion.innerHTML = `
            <ul class="question-container">
                <li>
                    <h3>Вопрос ${questionCount}</h3>
                    <label for="event-question-${questionCount}">Текст вопроса</label>
                    <input type="text" id="event-question-${questionCount}" 
                           class="form-input form-question-name" 
                           placeholder="Введите вопрос">
                </li>
                <li>
                    <label for="event-desc-${questionCount}">Описание вопроса</label>
                    <textarea id="event-desc-${questionCount}" 
                              class="form-input form-question-discription" 
                              placeholder="Введите описание"></textarea>
                </li>
            </ul>
        `;
        
        questionsList.appendChild(newQuestion);
    });
});