<!DOCTYPE html>
<html lang="ru">
<body>
    <head>
        <?php use Illuminate\Support\Facades\Storage; ?>
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
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
        <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">
    </head>
    <header>
        <nav class="header-nav">
        <a href="/" class="logo"><p>ВУЗ Афиша</p></a>
        <ul class="nav-list">
            <li class="header-create-event"><a href="/creation"><p><img src="<?php echo e(asset('img/plus.svg')); ?>" class="plus-img" alt="Плюс">Создать мероприятие</p></a></li>
            <li class="header-options"><button><img src="<?php echo e(asset('img/three-dots.svg')); ?>" alt="Настройки"></button></li>
            <li class="header-notifications"><button><img src="<?php echo e(asset('img/notifications.svg')); ?>" alt="Колокольчик"></button></li>
            <li class="header-profile"><a href="/account"><img src="<?php echo e(asset('img/account.svg')); ?>" alt="Профиль"></a></li>
        </ul>
        </nav>
        <div class="notifications-dropdown">
                <div class="notifications-content">
                    <div class="notification-item">
                        <p>Нет новых уведомлений.</p>
                    </div>
                </div>
        </div>
    </div>
</div>
    </header>
    <main>
        <section class="main-block">
            <h1>Все мероприятия твоего университета в одном месте.</h1>
            <div class="search-bar">
                <button class="input-button"><p>Поиск по названию</p><span class="input-magnifier"></span></button> <!--Поменять всё на CSS эелементы-->
            </div>
            <img src="<?php echo e(asset('img/guk-photo.png')); ?>" alt="Фотография ГУКа">
        </section>
        <section class="events">
            <h2>Ближайшие события:</h2>
            <?php if($upcomingEvents->count() > 0): ?>
                <div class="events-grid">
                    <?php $__currentLoopData = $upcomingEvents; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $event): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="event-card">
                            <div class="event-cover"></div>
                                <img
                                src="<?php echo e($event->cover_image
                                    ? Storage::url($event->cover_image)
                                    : asset('img/default-cover.png')); ?>"
                                alt="<?php echo e($event->title); ?>"
                                >
                            <div class="event-cover"></div>
                            <div class="event-info">
                                <h3><?php echo e($event->title); ?></h3>
                                <p class="event-short-desc"><?php echo e(Str::limit($event->short_description, 100)); ?></p>
                                <div class="event-meta">
                                    <span class="event-date">
                                        <?php echo e($event->event_date->format('d.m.Y H:i')); ?>

                                    </span>
                                    <span class="event-location">
                                        <?php echo e($event->is_online ? 'Онлайн' : ($event->location ?? 'Место не указано')); ?>

                                    </span>
                                </div>
                                <a href="<?php echo e(route('events.show', $event)); ?>" class="event-link">Подробнее</a>
                            </div>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            <?php else: ?>
                <p>Нет ближайших мероприятий</p>
            <?php endif; ?>
            <ul class="buttons-list">
                <li><button class="arrow-drop-down"><p>Категория<span class="arrow-icon"></span></p></button>
                    <ul class="dropdown-menu">
                        <li><button>Фестивали</button></li>
                        <li><button>Карьерные события</button></li>
                        <li><button>Выставки</button></li>
                    </ul>
                </li>
                <li><button id="dateButton" class="arrow-drop-down date-button">
                        <span class="date-text">Дата</span>
                        <span class="arrow-icon"></span>
                    </button>
                    <div class="calendar-container" id="calendarContainer">
                        <div class="calendar-header">
                            <div class="calendar-nav">
                                <button id="prevMonth">&lt;</button>
                                <button id="nextMonth">&gt;</button>
                            </div>
                            <div class="calendar-month" id="currentMonth"></div>
                        </div>
                        
                        <div class="calendar-weekdays">
                            <div>Пн</div>
                            <div>Вт</div>
                            <div>Ср</div>
                            <div>Чт</div>
                            <div>Пт</div>
                            <div>Сб</div>
                            <div>Вс</div>
                        </div>
                        
                        <div class="calendar-days" id="calendarDays"></div>
                        
                        <div class="calendar-footer">
                            <button id="clearButton">Очистить</button>
                            <button id="cancelButton">Отмена</button>
                            <button id="okButton">Ок</button>
                        </div>
                    </div>
                </li>
                <li><button class="arrow-drop-down"><p>Тематика<span class="arrow-icon"></span></p></button>
                    <ul class="dropdown-menu">
                        <li><button>Наука</button></li>
                        <li><button>Профессия</button></li>
                        <li><button>Культура</button></li>
                        <li><button>Развлечения</button></li>
                    </ul>
                </li>
                <li class="white-background"><button class="category-button search-button"><p>Город<span class="magnifier-icon"></span></p></button></li>
                <li class="white-background"><button class="category-button search-button"><p>ВУЗ<span class="magnifier-icon"></span></p></button></li>
            </ul>
            <?php if($otherEvents->count() > 0): ?>
                <div class="events-grid">
                    <?php $__currentLoopData = $otherEvents; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $event): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="event-card">
                            <div class="event-cover">
                                <img
                                src="<?php echo e($event->cover_image
                                    ? Storage::url($event->cover_image)
                                    : asset('img/default-cover.png')); ?>"
                                alt="<?php echo e($event->title); ?>"
                                >
                            </div>
                            <div class="event-info">
                                <h3><?php echo e($event->title); ?></h3>
                                <p class="event-short-desc"><?php echo e(Str::limit($event->short_description, 100)); ?></p>
                                <div class="event-meta">
                                    <span class="event-date">
                                        <?php echo e($event->event_date->format('d.m.Y H:i')); ?>

                                    </span>
                                    <span class="event-location">
                                        <?php echo e($event->is_online ? 'Онлайн' : ($event->location ?? 'Место не указано')); ?>

                                    </span>
                                </div>
                                <a href="<?php echo e(route('events.show', $event)); ?>" class="event-link">Подробнее</a>
                            </div>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            <?php else: ?>
                <p>Других мероприятий не найдено</p>
            <?php endif; ?>
        </section>
    </main>
    <footer>
        <p class="promo">© 2025 “ВУЗ Афиша”</p>
        <a href="#">vuzafisha@urfu.ru</a>
    </footer>
    <script src="js/calendar.js"></script>
    <script src="js/header.js"></script>
    <script src="js/falling-lists.js"></script>
</body><?php /**PATH C:\Users\aleha\Desktop\Laravel\MainProject\resources\views/home.blade.php ENDPATH**/ ?>