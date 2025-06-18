<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\CreationController;

use App\Http\Controllers\EventController;

use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index']);

Route::get('/account', [MainController::class, 'index2']);

Route::get('/register', [RegisterController::class, 'index']);

Route::get('/creation', [CreationController::class, 'index']);

// Route::get('/user/{id}/{name}', function ($id, $name) {
//     return view('user');
// });

// Route::get('/user/{id}/{name}', function ($id, $name) {
//     return view('user');
// });


// Route::prefix('events')->group(function () {
//     Route::get('/create', [EventController::class, 'create'])->name('events.create');
//     Route::post('/', [EventController::class, 'store'])->name('events.store');
// }); //Группировка

Route::get('/creation', [CreationController::class, 'create'])->name('creation.form');
Route::post('/save-event', [CreationController::class, 'store'])->name('event.save');

// Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');