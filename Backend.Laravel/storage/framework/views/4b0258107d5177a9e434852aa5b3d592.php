<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Все мероприятия | ВУЗ Афиша</title>
    <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">
    <style>
        .all-events-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .detailed-event-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .event-header {
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <?php echo $__env->make('partials.header', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

    <main class="all-events-container">
        <h1>Все мероприятия</h1>
        
        <?php $__currentLoopData = $events; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $event): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="detailed-event-card">
            <div class="event-header">
                <h2><?php echo e($event->title); ?></h2>
                <div class="event-meta">
                    <span>📅 <?php echo e($event->event_date->format('d.m.Y H:i')); ?></span> |
                    <span>📍 <?php echo e($event->is_online ? 'Онлайн' : $event->place); ?></span> |
                    <span>🏛️ <?php echo e($event->university); ?></span>
                </div>
            </div>
            
            <?php if($event->cover_image): ?>
            <div class="event-cover">
                <img src="<?php echo e(asset('storage/'.$event->cover_image)); ?>" alt="<?php echo e($event->title); ?>" style="max-height: 300px;">
            </div>
            <?php endif; ?>
            
            <div class="event-body">
                <h3>Описание</h3>
                <p><?php echo e($event->full_description); ?></p>
                
                <div class="event-organizer">
                    <h3>Организатор</h3>
                    <p><?php echo e($event->creator); ?></p>
                    <p>📧 <?php echo e($event->email); ?></p>
                </div>
            </div>
        </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </main>

    <?php echo $__env->make('partials.footer', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
</body>
</html><?php /**PATH C:\Users\aleha\Desktop\Laravel\MainProject\resources\views/show.blade.php ENDPATH**/ ?>