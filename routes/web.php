<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('todos', TodoController::class)->except(['show']);

    Route::as('todos.')->prefix('todos')->group(function () {
        Route::post('complete', [TodoController::class, 'markAsCompleted'])->name('markAsCompleted');
    });

    Route::as('notifications.')->prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::post('{notification}/read', [NotificationController::class, 'markAsRead'])->name('markAsRead');
        Route::post('{notification}/unread', [NotificationController::class, 'markAsUnread'])->name('markAsUnread');
    });

});

require __DIR__ . '/settings.php';
