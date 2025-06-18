        document.addEventListener('DOMContentLoaded', function() {
    // База данных статистики для каждого мероприятия
    const eventsStatsData = {
        'may-walk': {
            participants: [
                {name: 'Анастасия', surname: 'Алексеева', phone: '+7 900 100 80 50', email: 'a.alekseeva@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Иван', surname: 'Петров', phone: '+7 912 345 67 89', email: 'i.petrov@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Мария', surname: 'Сидорова', phone: '+7 923 456 78 90', email: 'm.sidorova@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Андрей', surname: 'Медведев', phone: '+7 912 101 86 50', email: 'a.medvedev@vuz.afisha', city: 'Ярославль', attended: true},
                {name: 'Кристина', surname: 'Ромашкова', phone: '+7 924 165 30 54', email: 'k.romashkova@vuz.afisha', city: 'Новосибирск', attended: true},
                {name: 'Сергей', surname: 'Беляев', phone: '+7 910 109 32 12', email: 's.belyajev@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Игорь', surname: 'Романов', phone: '+7 950 123 10 59', email: 'i.romanov@vuz.afisha', city: 'Новосибирск', attended: true},
                {name: 'Роман', surname: 'Мостков', phone: '+7 922 245 82 51', email: 'r.mostkov@vuz.afisha', city: 'Челябинск', attended: false},
                {name: 'Анастасия', surname: 'Петрова', phone: '+7 924 120 81 50', email: 'a.petrova@vuz.afisha', city: 'Екатеринбург', attended: false},
                {name: 'Ирина', surname: 'Шоколева', phone: '+7 900 100 80 50', email: 'i.shokoleva@vuz.afisha', city: 'Ярославль', attended: false},
                {name: 'Егор', surname: 'Матвеев', phone: '+7 922 134 81 35', email: 'e.matveev@vuz.afisha', city: 'Екатеринбург', attended: false}
            ],
            registered: 11,
            attended: 7
        },
        'art-masters': {
            participants: [
                {name: 'Елена', surname: 'Кузнецова', phone: '+7 901 234 56 78', email: 'e.kuznetsova@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Алексей', surname: 'Смирнов', phone: '+7 902 345 67 89', email: 'a.smirnov@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Ольга', surname: 'Попова', phone: '+7 903 456 78 90', email: 'o.popova@vuz.afisha', city: 'Нижний Тагил', attended: true},
                {name: 'Андрей', surname: 'Медведев', phone: '+7 912 101 86 50', email: 'a.medvedev@vuz.afisha', city: 'Ярославль', attended: true}
            ],
            registered: 4,
            attended: 4
        },
        'culture-time': {
            participants: [
                {name: 'Дмитрий', surname: 'Васильев', phone: '+7 904 567 89 01', email: 'd.vasilyev@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Светлана', surname: 'Новикова', phone: '+7 905 678 90 12', email: 's.novikova@vuz.afisha', city: 'Новосибирск', attended: true},
                {name: 'Андрей', surname: 'Морозов', phone: '+7 906 789 01 23', email: 'a.morozov@vuz.afisha', city: 'Челябинск', attended: true},
                {name: 'Сергей', surname: 'Беляев', phone: '+7 910 109 32 12', email: 's.belyajev@vuz.afisha', city: 'Екатеринбург', attended: false},
                {name: 'Игорь', surname: 'Романов', phone: '+7 950 123 10 59', email: 'i.romanov@vuz.afisha', city: 'Екатеринбург', attended: false},
                {name: 'Роман', surname: 'Мостков', phone: '+7 922 245 82 51', email: 'r.mostkov@vuz.afisha', city: 'Екатеринбург', attended: false}
            ],
            registered: 6,
            attended: 3
        },
        'day-life': {
            participants: [
                {name: 'Наталья', surname: 'Волкова', phone: '+7 907 890 12 34', email: 'n.volkova@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Сергей', surname: 'Козлов', phone: '+7 908 901 23 45', email: 's.kozlov@vuz.afisha', city: 'Новосибирск', attended: true},
                {name: 'Татьяна', surname: 'Лебедева', phone: '+7 909 012 34 56', email: 't.lebedeva@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Сергей', surname: 'Беляев', phone: '+7 910 109 32 12', email: 's.belyajev@vuz.afisha', city: 'Челябинск', attended: true},
                {name: 'Дмитрий', surname: 'Васильев', phone: '+7 904 567 89 01', email: 'd.vasilyev@vuz.afisha', city: 'Екатеринбург', attended: false}
            ],
            registered: 5,
            attended: 4
        },
        'mediaprom': {
            participants: [
                {name: 'Артем', surname: 'Соколов', phone: '+7 910 123 45 67', email: 'a.sokolov@vuz.afisha', city: 'Ярославль', attended: true},
                {name: 'Юлия', surname: 'Павлова', phone: '+7 911 234 56 78', email: 'y.pavlova@vuz.afisha', city: 'Ярославль', attended: true},
                {name: 'Максим', surname: 'Семенов', phone: '+7 912 345 67 89', email: 'm.semenov@vuz.afisha', city: 'Екатеринбург', attended: true},
                {name: 'Дмитрий', surname: 'Васильев', phone: '+7 904 567 89 01', email: 'd.vasilyev@vuz.afisha', city: 'Екатеринбург', attended: false},
                {name: 'Светлана', surname: 'Новикова', phone: '+7 905 678 90 12', email: 's.novikova@vuz.afisha', city: 'Екатеринбург', attended: false},
                {name: 'Андрей', surname: 'Морозов', phone: '+7 906 789 01 23', email: 'a.morozov@vuz.afisha', city: 'Нижний Танил', attended: false},
                {name: 'Елена', surname: 'Кузнецова', phone: '+7 901 234 56 78', email: 'e.kuznetsova@vuz.afisha', city: 'Челябинск', attended: false},
                {name: 'Анастасия', surname: 'Алексеева', phone: '+7 900 100 80 50', email: 'a.alekseeva@vuz.afisha', city: 'Екатеринбург', attended: false}
            ],
            registered: 8,
            attended: 3
        }
    };

    // Обработчики для карточек мероприятий
    document.querySelectorAll('.event-slider img').forEach(img => {
        img.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            showEventStats(eventId);
        });
    });
    
    // Функция для отображения статистики мероприятия
    function showEventStats(eventId) {
        // Активируем вкладку статистики
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.tab-button[data-tab="stats"]').classList.add('active');
        
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById('stats').classList.add('active');
        
        // Устанавливаем название мероприятия
        const eventName = getEventName(eventId);
        document.getElementById('event-name').textContent = eventName;
        
        // Получаем данные для выбранного мероприятия
        const eventData = eventsStatsData[eventId] || {
            participants: [],
            registered: 0,
            attended: 0
        };
        
        // Заполняем таблицу
        fillStatsTable(eventData);
    }
    
    // Функция для получения названия мероприятия по ID
    function getEventName(eventId) {
        const names = {
            'may-walk': 'Майская прогулка',
            'art-masters': 'ArtMasters',
            'culture-time': 'Время Карьеры',
            'day-life': 'День. Жизнь. Вечность.',
            'mediaprom': 'Медиапром'
        };
        return names[eventId] || 'Неизвестное мероприятие';
    }
    
    // Функция для заполнения таблицы
    function fillStatsTable(data) {
    const tbody = document.getElementById('stats-table-body');
    tbody.innerHTML = '';
    
    data.participants.forEach(participant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant.name}</td>
            <td>${participant.surname}</td>
            <td>${participant.phone}</td>
            <td>${participant.email}</td>
            <td>${participant.city}</td>
        `;
        
        // Добавляем класс, если участник посетил мероприятие
        if (participant.attended) {
            row.classList.add('attended-participant');
        }
        
        tbody.appendChild(row);
    });
    
    // Обновляем счетчики
    document.getElementById('registered-count').textContent = data.registered;
    document.getElementById('attended-count').textContent = data.attended;
}
});