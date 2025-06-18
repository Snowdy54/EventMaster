document.querySelectorAll('.arrow-drop-down').forEach(button => {
    const menu = button.nextElementSibling;
        
    if (menu && menu.classList.contains('dropdown-menu')) {
        menu.style.display = 'none';
            
        button.addEventListener('click', function(e) {
            e.stopPropagation();
                
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.style.display = 'none';
                    m.previousElementSibling.classList.remove('active');
                }
            });
                
            if (menu.style.display === 'block') {
                 menu.style.display = 'none';
                this.classList.remove('active');
            } else {
                 menu.style.display = 'block';
                this.classList.add('active');
            }
        });
    }
});

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.arrow-drop-down') && !e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                const btn = menu.previousElementSibling;
                if (btn) btn.classList.remove('active');
            });
        }
    });