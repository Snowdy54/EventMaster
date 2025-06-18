const state = {
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
               'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthIndex: 2,
      day: 15,
      year: 2025,
      hour: 9,
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
    }

    document.querySelectorAll('.arrow').forEach(arrow => {
      arrow.addEventListener('click', () => {
        const type = arrow.dataset.type;
        const dir = arrow.dataset.dir;

        if (type === 'month') {
          state.monthIndex = (state.monthIndex + (dir === 'up' ? -1 : 1) + 12) % 12;
          clampDay();
        } else if (type === 'day') {
          state.day += (dir === 'up' ? -1 : 1);
          if (state.day < 1) state.day = 1;
          clampDay();
        } else if (type === 'year') {
          state.year += (dir === 'up' ? -1 : 1);
          clampDay();
        } else if (type === 'hour') {
          state.hour = (state.hour + (dir === 'up' ? -1 : 1) + 24) % 24;
        } else if (type === 'minute') {
          state.minute = (state.minute + (dir === 'up' ? -1 : 1) + 60) % 60;
        }

        updateUI();
      });
    });

    updateUI();