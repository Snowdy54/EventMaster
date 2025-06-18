document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения текущей даты и времени из state

    let selectedAgeLimit = null;
    let selectedPrivacy = null;

    function getCurrentDateTime() {
        const monthIndex = state.months.indexOf(
            document.querySelector('.value[data-type="month"]').textContent
        );
        
        return {
            date: new Date(
                state.year,
                monthIndex,
                state.day,
                state.hour,
                state.minute
            ),
            monthName: state.months[monthIndex],
            day: state.day,
            year: state.year,
            hour: state.hour,
            minute: state.minute
        };
    }

    // Функция для сбора всех данных формы
    function collectFormData() {
        const dateTime = getCurrentDateTime();
        
        const eventData = {
            name: document.getElementById('event-name').value,
            shortDescription: document.getElementById('event-short-description').value,
            fullDescription: document.getElementById('event-full-description').value,
            mode: document.querySelector('input[name="event-mode"]:checked').value,
            place: document.getElementById('event-place').value,
            university: document.getElementById('event-university').value,
            dateTime: {
                date: dateTime.date.toISOString(),
                formatted: `${dateTime.day} ${dateTime.monthName} ${dateTime.year}, ${dateTime.hour.toString().padStart(2, '0')}:${dateTime.minute.toString().padStart(2, '0')}`,
                details: {
                    month: dateTime.monthName,
                    day: dateTime.day,
                    year: dateTime.year,
                    hour: dateTime.hour,
                    minute: dateTime.minute
                }
            },
            category: document.querySelector('.form-category-select').value,
            theme: document.querySelector('.form-theme-select').value,
            creator: document.getElementById('event-creator').value,
            legalAddress: document.getElementById('event-legal-address').value,
            email: document.getElementById('event-email').value,
            formText: document.getElementById('event-form-for-people').value,
            customQuestions: [],
            isPublished: false,
            ageLimit: selectedAgeLimit,
            privacy: selectedPrivacy
        };

        // Собираем кастомные вопросы
        const questionContainers = document.querySelectorAll('.question-container');
        questionContainers.forEach((container, index) => {
            const questionText = container.querySelector('.form-question-name').value;
            const questionDescription = container.querySelector('.form-question-discription').value;
            
            if (questionText) {
                eventData.customQuestions.push({
                    id: index + 1,
                    text: questionText,
                    description: questionDescription
                });
            }
        });

        return eventData;
    }

    // Функция для сохранения данных
    function saveEventData(isDraft = false) {
        const eventData = collectFormData();
        eventData.isDraft = isDraft;
        eventData.lastSaved = new Date().toISOString();
        eventData.id = eventData.name.toLowerCase().replace(/\s+/g, '-');

        const events = JSON.parse(localStorage.getItem('events')) || [];
        const existingIndex = events.findIndex(e => e.id === eventData.id);
        
        if (existingIndex >= 0) {
            events[existingIndex] = eventData;
        } else {
            events.push(eventData);
        }
        
        localStorage.setItem('events', JSON.stringify(events));

        console.log('Данные сохранены:', eventData);
        return eventData;
    }

    // Функция для очистки формы и перехода на главную
    function cancelCreation() {
        // Удаляем только черновики текущего пользователя
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.filter(event => !event.isDraft);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        
        // Очищаем форму
        resetForm();
        
        // Переход на главную
        window.location.href = '../index.html';
    }

    // Функция для очистки формы
    function resetForm() {
        document.getElementById('event-name').value = '';
        document.getElementById('event-short-description').value = '';
        document.getElementById('event-full-description').value = '';
        document.getElementById('event-place').value = '';
        document.getElementById('event-university').value = '';
        document.getElementById('event-creator').value = '';
        document.getElementById('event-legal-address').value = '';
        document.getElementById('event-email').value = '';
        document.getElementById('event-form-for-people').value = '';
        
        // Сбрасываем радио-кнопки
        document.getElementById('online-mode').checked = true;
        
        // Сбрасываем селекторы
        document.querySelector('.form-category-select').selectedIndex = 0;
        document.querySelector('.form-theme-select').selectedIndex = 0;
        
        // Сбрасываем вопросы
        document.getElementById('questions-list').innerHTML = '';
        
        // Сбрасываем дату и время к начальным значениям
        state.monthIndex = 2;
        state.day = 15;
        state.year = 2025;
        state.hour = 9;
        state.minute = 0;
        updateUI();
    }

    // Функция для публикации мероприятия
    function publishEvent() {
        const eventData = saveEventData(false);
        eventData.isPublished = true;
        eventData.publishedAt = new Date().toISOString();
        
        // Обновляем в хранилище
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const existingIndex = events.findIndex(e => e.id === eventData.id);
        
        if (existingIndex >= 0) {
            events[existingIndex] = eventData;
        } else {
            events.push(eventData);
        }
        
        localStorage.setItem('events', JSON.stringify(events));
        
        alert('Мероприятие успешно опубликовано!');
        window.location.href = '../index.html';
    }

    document.querySelectorAll('.age-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.age-button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        // Сохраняем выбранное значение
        selectedAgeLimit = this.textContent;
    });
});

document.querySelectorAll('.private-button-1, .private-button-2').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.private-button-1, .private-button-2').forEach(btn => {
            btn.classList.remove('active');
        });
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        // Сохраняем выбранное значение
        selectedPrivacy = this.textContent;
    });
});

    // Обработчики событий
    document.querySelector('.continue-button').addEventListener('click', function(e) {
        e.preventDefault();
        saveEventData(false);
        console.log('Продолжить с данными:', eventData);
    });

    document.querySelector('.save-data').addEventListener('click', function(e) {
        e.preventDefault();
        saveEventData(true);
        alert('Черновик успешно сохранен!');
        console.log('Черновик сохранен:', eventData);
    });

    document.querySelector('.cancel-creation-button').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите отменить создание? Все несохраненные данные будут потеряны.')) {
            cancelCreation();
        }
    });

    document.querySelector('.publication-button').addEventListener('click', function(e) {
        e.preventDefault();
        publishEvent();
    });

    // Загрузка черновика при открытии страницы
    loadDraft();

    // Функция для загрузки черновика
    function loadDraft() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const draft = events.find(e => e.isDraft);
        
        if (draft) {
            // Заполняем форму данными из черновика
            document.getElementById('event-name').value = draft.name || '';
            document.getElementById('event-short-description').value = draft.shortDescription || '';
            document.getElementById('event-full-description').value = draft.fullDescription || '';
            
            // Заполняем радио-кнопки формата
            document.querySelector(`input[name="event-mode"][value="${draft.mode}"]`).checked = true;
            
            // Заполняем место и ВУЗ
            document.getElementById('event-place').value = draft.place || '';
            document.getElementById('event-university').value = draft.university || '';
            
            // Заполняем дату и время
            if (draft.dateTime) {
                const date = new Date(draft.dateTime.date);
                state.year = date.getFullYear();
                state.monthIndex = date.getMonth();
                state.day = date.getDate();
                state.hour = draft.dateTime.details.hour;
                state.minute = draft.dateTime.details.minute;
                updateUI();
            }
            
            // Заполняем категории
            if (draft.category) {
                document.querySelector('.form-category-select').value = draft.category;
            }
            if (draft.theme) {
                document.querySelector('.form-theme-select').value = draft.theme;
            }
            
            // Заполняем данные организатора
            document.getElementById('event-creator').value = draft.creator || '';
            document.getElementById('event-legal-address').value = draft.legalAddress || '';
            document.getElementById('event-email').value = draft.email || '';
            
            // Заполняем текст анкеты
            document.getElementById('event-form-for-people').value = draft.formText || '';
            
            // Заполняем кастомные вопросы
            if (draft.customQuestions && draft.customQuestions.length > 0) {
                const questionsList = document.getElementById('questions-list');
                questionsList.innerHTML = ''; // Очищаем существующие вопросы
                
                draft.customQuestions.forEach(question => {
                    const newQuestion = document.createElement('li');
                    newQuestion.className = 'question';
                    newQuestion.innerHTML = `
                        <ul class="question-container">
                            <li>
                                <h3>Вопрос ${question.id}</h3>
                                <label for="event-question-${question.id}">Текст вопроса</label>
                                <input type="text" id="event-question-${question.id}" 
                                       class="form-input form-question-name" 
                                       placeholder="Введите вопрос"
                                       value="${question.text || ''}">
                            </li>
                            <li>
                                <label for="event-desc-${question.id}">Описание вопроса</label>
                                <textarea id="event-desc-${question.id}" 
                                          class="form-input form-question-discription" 
                                          placeholder="Введите описание">${question.description || ''}</textarea>
                            </li>
                        </ul>
                    `;
                    questionsList.appendChild(newQuestion);
                });
            }

            // Восстанавливаем возрастное ограничение
        if (draft.ageLimit) {
            selectedAgeLimit = draft.ageLimit;
            document.querySelectorAll('.age-button').forEach(button => {
                if (button.textContent === draft.ageLimit) {
                    button.classList.add('active');
                }
            });
        }
        
        // Восстанавливаем приватность
        if (draft.privacy) {
            selectedPrivacy = draft.privacy;
            document.querySelectorAll('.private-button-1, .private-button-2').forEach(button => {
                if (button.textContent === draft.privacy) {
                    button.classList.add('active');
                }
            });
        }
        
            
            console.log('Черновик загружен:', draft);
            return draft;
        }
        
        return null;
    }

    // При загрузке страницы загружаем черновик
    loadDraft();
});