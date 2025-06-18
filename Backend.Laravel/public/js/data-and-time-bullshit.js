const state = {
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
           'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthIndex: 0, // Март (0-11)
  day: 15,
  year: 2025,
  hour: 12,
  minute: 0,
};

function updateUI() {
  document.querySelector('.value[data-type="month"]').textContent = state.months[state.monthIndex];
  document.querySelector('.value[data-type="day"]').textContent = state.day;
  document.querySelector('.value[data-type="year"]').textContent = state.year;
  document.querySelector('.value[data-type="hour"]').textContent = state.hour.toString().padStart(2, '0');
  document.querySelector('.value[data-type="minute"]').textContent = state.minute.toString().padStart(2, '0');
}

function clampDay() {
  const daysInMonth = new Date(state.year, state.monthIndex + 1, 0).getDate();
  if (state.day > daysInMonth) state.day = daysInMonth;
  if (state.day < 1) state.day = 1;
}

document.querySelectorAll('.arrow').forEach(arrow => {
  arrow.addEventListener('click', () => {
    const type = arrow.dataset.type;
    const dir = arrow.dataset.dir;

    if (type === 'month') {
      // Для месяцев: up - следующий месяц, down - предыдущий
      state.monthIndex = (state.monthIndex + (dir === 'up' ? 1 : -1) + 12) % 12;
      clampDay();
    } else if (type === 'day') {
      // Для дней: up - увеличиваем, down - уменьшаем
      state.day += (dir === 'up' ? 1 : -1);
      clampDay();
    } else if (type === 'year') {
      // Для года: up - увеличиваем, down - уменьшаем
      state.year += (dir === 'up' ? 1 : -1);
      clampDay();
    } else if (type === 'hour') {
      // Для часов: up - увеличиваем, down - уменьшаем
      state.hour = (state.hour + (dir === 'up' ? 1 : -1) + 24) % 24;
    } else if (type === 'minute') {
      // Для минут: up - увеличиваем, down - уменьшаем
      state.minute = (state.minute + (dir === 'up' ? 1 : -1) + 60) % 60;
    }

    updateUI();
  });
});

// Инициализация интерфейса
updateUI();