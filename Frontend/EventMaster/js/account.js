const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
            
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                    // Удаляем активный класс у всех кнопок и панелей
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // Добавляем активный класс текущей кнопке и соответствующей панели
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });