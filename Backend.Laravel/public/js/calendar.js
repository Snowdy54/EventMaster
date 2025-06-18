document.addEventListener('DOMContentLoaded', function() {
            const dateButton = document.getElementById('dateButton');
            const calendarContainer = document.getElementById('calendarContainer');
            const currentMonthElement = document.getElementById('currentMonth');
            const calendarDaysElement = document.getElementById('calendarDays');
            const prevMonthButton = document.getElementById('prevMonth');
            const nextMonthButton = document.getElementById('nextMonth');
            const clearButton = document.getElementById('clearButton');
            const cancelButton = document.getElementById('cancelButton');
            const okButton = document.getElementById('okButton');
            
            let currentDate = new Date();
            let selectedDate = null;
            
            // Показать/скрыть календарь
            dateButton.addEventListener('click', function() {
                calendarContainer.style.display = calendarContainer.style.display === 'block' ? 'none' : 'block';
                renderCalendar();
            });
            
            // Обработчики кнопок навигации
            prevMonthButton.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
            
            nextMonthButton.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
            
            // Обработчики кнопок в футере
            clearButton.addEventListener('click', function() {
                selectedDate = null;
                dateButton.querySelector('.date-text').textContent = 'Дата'; // Изменяем только текст
                renderCalendar();
            });

            cancelButton.addEventListener('click', function() {
                calendarContainer.style.display = 'none';
                dateButton.querySelector('.date-text').textContent = 'Дата'; // Изменяем только текст
            });

            okButton.addEventListener('click', function() {
                if (selectedDate) {
                    dateButton.querySelector('.date-text').textContent = formatDate(selectedDate); // Изменяем только текст
                }
                calendarContainer.style.display = 'none';
            });
            
            // Рендер календаря
            function renderCalendar() {
                currentMonthElement.textContent = getMonthName(currentDate.getMonth()) + ' ' + currentDate.getFullYear();
                
                const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                
                const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
                const totalDays = lastDayOfMonth.getDate();
                
                calendarDaysElement.innerHTML = '';
                
                // Добавляем дни из предыдущего месяца
                const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
                for (let i = startDay - 1; i >= 0; i--) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day other-month';
                    dayElement.textContent = prevMonthLastDay - i;
                    calendarDaysElement.appendChild(dayElement);
                }
                
                // Добавляем дни текущего месяца
                for (let i = 1; i <= totalDays; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day';
                    dayElement.textContent = i;
                    
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                    if (selectedDate && isSameDate(date, selectedDate)) {
                        dayElement.classList.add('selected');
                    }
                    
                    dayElement.addEventListener('click', function() {
                        selectedDate = date;
                        renderCalendar();
                    });
                    
                    calendarDaysElement.appendChild(dayElement);
                }
                
                // Добавляем дни следующего месяца
                const daysToAdd = 42 - (startDay + totalDays); // 6 рядов по 7 дней
                for (let i = 1; i <= daysToAdd; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day other-month';
                    dayElement.textContent = i;
                    calendarDaysElement.appendChild(dayElement);
                }
            }
            
            // Вспомогательные функции
            function getMonthName(monthIndex) {
                const months = [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                ];
                return months[monthIndex];
            }
            
            function isSameDate(date1, date2) {
                return date1.getFullYear() === date2.getFullYear() &&
                       date1.getMonth() === date2.getMonth() &&
                       date1.getDate() === date2.getDate();
            }
            
            function formatDate(date) {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            }
        });