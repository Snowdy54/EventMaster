    document.addEventListener('DOMContentLoaded', function() {
    const notificationsBtn = document.querySelector('.header-notifications button');
    const dropdown = document.querySelector('.notifications-dropdown');
    
    notificationsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.closest('.header-notifications').classList.toggle('active');
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });
    
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && e.target !== notificationsBtn) {
            dropdown.style.display = 'none';
            document.querySelector('.header-notifications').classList.remove('active');
        }
    })
    });