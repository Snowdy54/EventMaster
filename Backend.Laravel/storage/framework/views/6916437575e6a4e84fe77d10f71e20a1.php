<!DOCTYPE html>
<html lang="ru">
<body>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Сайт для помощи в организации и нахождении мероприятий в ВУЗе">
        <title>EventMaster | Организатор мероприятий</title>
        <style>
            @font-face {
                font-family: 'Bounded';
                src: url("<?php echo e(asset('fonts/Bounded-Regular.woff')); ?>") format('woff'),
                     url("<?php echo e(asset('fonts/Bounded-Variable.woff')); ?>") format('woff'),
                     url("<?php echo e(asset('fonts/Bounded-Black.woff')); ?>") format('woff'),
                     url("<?php echo e(asset('fonts/Bounded-ExtraLight.woff')); ?>") format('woff');
                font-display: swap;
            }
            body{
                font-family: 'Bounded', sans-serif;
            }
        </style>
        <link rel="stylesheet" href="<?php echo e(asset('css/account.css')); ?>">
    </head>
    <header>
        <nav class="header-nav">
        <a href="/" class="logo"><p>ВУЗ Афиша</p></a>
        <ul class="nav-list">
            <li class="header-create-event"><a href="/creation"><p><img src="<?php echo e(asset('img/plus.svg')); ?> " class="plus-img" alt="Плюс">Создать мероприятие</p></a></li>
            <li class="header-options"><button><img src="<?php echo e(asset('img/three-dots.svg')); ?>" alt="Настройки"></button></li>
            <li class="header-notifications"><button><img src="<?php echo e(asset('img/notifications.svg')); ?>" alt="Колокольчик"></button></li>
            <li class="header-profile"><a href="#"><img src="<?php echo e(asset('img/account.svg')); ?>" alt="Профиль"></a></li>
        </ul>
    </nav>
    </header>

    </nav>
        <div class="notifications-dropdown">
                <div class="notifications-content">
                    <div class="notification-item">
                        <p>Нет новых уведомлений.</p>
                    </div>
                </div>
        </div>
    </header>
    <main>
    <div class="account-container">
        <nav class="account-tabs">
            <button class="tab-button active" data-tab="events">События</button>
            <button class="tab-button" data-tab="stats">Статистика</button>
            <button class="tab-button" data-tab="chats">Чаты</button>
            <button class="tab-button" data-tab="profile">Личные данные</button>
        </nav>

        <div class="tab-content">
            <!-- Секция событий -->
            <section class="tab-pane active" id="events">
                <div class="slider-view" id="slider-view">
                    <h2>Предстоящие события</h2>
                    <div class="event-slider-2">
                        <img src="<?php echo e(asset('img/may-walk.png')); ?>" alt="Майская прогулка">
                        <img src="<?php echo e(asset('img/art-masters.png')); ?>" alt="ArtMasters">
                        <img src="<?php echo e(asset('img/career-time.png')); ?>" alt="Время Карьеры">
                        <img src="<?php echo e(asset('img/day-life.png')); ?>" alt="День. Жизнь. Вечность.">
                        <img src="<?php echo e(asset('img/mediaprom.png')); ?>" alt="Медиапром">
                    </div>
                    <h2>Прошедшие события:</h2>
                    <div class="event-slider">
                        <img src="<?php echo e(asset('img/may-walk-profile.png')); ?>" data-event="may-walk" alt="Майская прогулка">
                        <img src="<?php echo e(asset('img/art-masters-profile.png')); ?>" data-event="art-masters" alt="ArtMasters">
                        <img src="<?php echo e(asset('img/culture-time-profile.png')); ?>" data-event="culture-time" alt="Время Карьеры">
                        <img src="<?php echo e(asset('img/day-life-profile.png')); ?>" data-event="day-life" alt="День. Жизнь. Вечность.">
                        <img src="<?php echo e(asset('img/mediaprom-profile.png')); ?>" data-event="mediaprom" alt="Медиапром">
                    </div>
                </div>
                <div class="calendar-view" id="calendar-view" style="display:none">
                    <div id="calendar"></div>
                </div>
            </section>

            <!-- Секция статистики -->
            <section class="tab-pane" id="stats">
                <div class="event-stats-container">
                    <h2 id="stats-event-title">Статистика мероприятия: <span id="event-name"></span></h2>
                    
                    <div class="stats-table-container">
                        <table class="stats-table">
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Фамилия</th>
                                    <th>Телефон</th>
                                    <th>E-mail</th>
                                    <th>Город</th>
                                </tr>
                            </thead>
                            <tbody id="stats-table-body">
                                <!-- Данные будут заполняться динамически -->
                            </tbody>
                        </table>
                    </div>
                    <div class="stats-summary">
                        <p>Зарегистрировано: <span id="registered-count">0</span></p>
                        <p>Посетило: <span id="attended-count">0</span></p>
                        <p>Посетили - <span class="attended"></span></p>
                        <p>Отсутствовали - <span class="missed"></span></p>
                    </div>
                </div>
            </section>

        <!-- Секция чатов -->
        <section class="tab-pane" id="chats">
            <h2>Ваши чаты</h2>
            <!-- Список чатов -->
        </section>

        <!-- Секция личных данных -->
        <section class="tab-pane" id="profile">
            <h2>Личные данные</h2>
            <!-- Форма редактирования -->
        </section>
        </div>
    </div>
    </main>
    <footer>
        <p class="promo">© 2025 “ВУЗ Афиша”</p>
        <a href="#">vuzafisha@urfu.ru</a>
    </footer>
    <script src="js/header.js"></script>
    <script src="js/account.js"></script>
    <script src="js/statistics.js"></script>
</body><?php /**PATH C:\Users\aleha\Desktop\Laravel\MainProject\resources\views/account.blade.php ENDPATH**/ ?>