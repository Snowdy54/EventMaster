document.addEventListener('DOMContentLoaded', function() {

    // let selectedAgeLimit = null;
    // let selectedPrivacy = null;



    // Функция для получения текущей даты и времени из state
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
        const coverImageInput = document.getElementById('event-cover');

        const formData = new FormData();

        if (coverImageInput.files[0]) {
        formData.append('cover_image', coverImageInput.files[0]);
    }
        
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

        return { eventData, formData };
    }

    // Функция для сохранения данных
    // function saveEventData(isDraft = false) {
    //     const eventData = collectFormData();
    //     eventData.isDraft = isDraft;
    //     eventData.lastSaved = new Date().toISOString();
    //     eventData.id = eventData.name.toLowerCase().replace(/\s+/g, '-');

    //     const events = JSON.parse(localStorage.getItem('events')) || [];
    //     const existingIndex = events.findIndex(e => e.id === eventData.id);
        
    //     if (existingIndex >= 0) {
    //         events[existingIndex] = eventData;
    //     } else {
    //         events.push(eventData);
    //     }
        
    //     localStorage.setItem('events', JSON.stringify(events));

    //     console.log('Данные сохранены:', eventData);
    //     return eventData;
    // }

    // Функция для очистки формы и перехода на главную
    function cancelCreation() {
        // Удаляем только черновики текущего пользователя
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.filter(event => !event.isDraft);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        
        // Очищаем форму
        resetForm();
        
        // Переход на главную
        window.location.href = '/';
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
    async function publishEvent() {
        const eventData = collectFormData();
        eventData.isDraft = false;
        eventData.isPublished = true;
        
        const result = await sendEventData(eventData, '/save-event');
        
        if (result.success) {
            // Очищаем localStorage после успешной публикации
            localStorage.removeItem('events');
            window.location.href = '/';
        } else {
            alert('Ошибка: ' + (result.message || 'Не удалось опубликовать мероприятие'));
        }
    }

    // Обработчики событий
    document.querySelectorAll('.continue-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (descriptionForm.classList.contains('active')) {
                descriptionForm.classList.remove('active');
                registrationForm.classList.add('active');
                tabButton1.classList.remove('active');
                tabButton2.classList.add('active');
            } else if (registrationForm.classList.contains('active')) {
                registrationForm.classList.remove('active');
                ticketOptionsForm.classList.add('active');
                tabButton2.classList.remove('active');
                tabButton3.classList.add('active');
            }
        });
    });

    document.querySelector('.save-data').addEventListener('click', async function(e) {
        e.preventDefault();
        await saveEventData(true);
        
        // const result = await sendEventData(eventData, '/save-event');
        // if (result.success) {
        //     alert('Черновик сохранен!');
        // }
    });

    document.querySelector('.cancel-creation-button').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите отменить создание? Все несохраненные данные будут потеряны.')) {
            cancelCreation();
        }
    });

    document.querySelector('.publication-button').addEventListener('click', async function(e) {
    e.preventDefault();
    await saveEventData(false);
    
    // try {
    //     const eventData = collectFormData();
    //     eventData.isDraft = false;
        
    //     const result = await sendEventData(eventData, '/save-event');
        
    //     if (result.success) {
    //         window.location.href = '/';
    //     } else {
    //         button.disabled = false;
    //     }
    // } catch (error) {
    //     button.disabled = false;
    // }
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

    async function sendEventData(data, endpoint) {
    try {
        const formData = data.formData || new FormData();
        const eventData = data.eventData;
        
        formData.append('name', eventData.name);
        formData.append('shortDescription', eventData.shortDescription);
        formData.append('fullDescription', eventData.fullDescription);
        formData.append('mode', eventData.mode);
        formData.append('place', eventData.place);
        formData.append('university', eventData.university);
        formData.append('dateTime.date', eventData.dateTime.date);

        formData.append('category', eventData.category);
        formData.append('theme', eventData.theme);
        formData.append('creator', eventData.creator);
        formData.append('legalAddress', eventData.legalAddress);
        formData.append('email', eventData.email);
        formData.append('formText', eventData.formText);
        formData.append('isDraft', data.isDraft ? '1' : '0');

        formData.append('age_restriction', eventData.ageLimit || '0+');
        formData.append('is_public', eventData.privacy ? '1' : '0');
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                // убираем 'Content-Type': 'application/json'
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Неизвестная ошибка');
            return result;

        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    async function saveEventData(isDraft = false) {
        const { eventData, formData } = collectFormData();
        eventData.isDraft = isDraft;
        
        // Для черновиков сохраняем в localStorage (без изображений)
        if (isDraft) {
            const events = JSON.parse(localStorage.getItem('events')) || [];
            const existingIndex = events.findIndex(e => e.id === eventData.id);
            
            if (existingIndex >= 0) {
                events[existingIndex] = eventData;
            } else {
                events.push(eventData);
            }
            
            localStorage.setItem('events', JSON.stringify(events));
        }
        
        // Отправка на сервер (с изображениями)
        const result = await sendEventData({ eventData, formData }, '/save-event');
        
        if (result.success) {
            if (!isDraft) {
                localStorage.removeItem('events');
                window.location.href = '/';
            }
        } else {
            alert('Ошибка: ' + (result.message || 'Неизвестная ошибка'));
        }
    }

    const ageButtons = document.querySelectorAll('.age-button');
    let selectedAgeLimit = null;

    ageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            ageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedAgeLimit = this.textContent;      // ← сохраняем сюда
            console.log('Выбрано возрастное ограничение:', selectedAgeLimit);
        });
    });


    // Обработка выбора приватности
    const privacyButtons = document.querySelectorAll('.private-button-1, .private-button-2');
    let selectedPrivacy = null;  // true = публично, false = по ссылке

    privacyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            privacyButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedPrivacy = this.classList.contains('private-button-1');  
            console.log('Приватность:', selectedPrivacy ? 'Публичное' : 'Только по ссылке');
        });
    });

    // При загрузке страницы загружаем черновик
    loadDraft();
});