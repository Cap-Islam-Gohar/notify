<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\NotificationApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\TodoApiController;
use Illuminate\Support\Facades\Route;


Route::as('api.')->group(function () {

    Route::post('register', [AuthApiController::class, 'register'])->name('register')->middleware('guest');
    Route::post('login', [AuthApiController::class, 'login'])->name('login')->middleware('guest');
    Route::middleware('auth:sanctum')->post('logout', [AuthApiController::class, 'logout'])->name('logout');

    Route::middleware('auth:sanctum')->group(function () {

        Route::apiResource('products', ProductApiController::class);
        Route::apiResource('todos', TodoApiController::class);

        Route::as('todos.')->prefix('todos')->group(function () {
            Route::post('complete', [TodoApiController::class, 'markAsCompleted'])->name('markAsCompleted');
        });

        Route::as('notifications.')->prefix('notifications')->group(function () {
            Route::get('/', [NotificationApiController::class, 'index'])->name('index');
            Route::post('{notification}/read', [NotificationApiController::class, 'markAsRead'])->name('markAsRead');
            Route::post('{notification}/unread', [NotificationApiController::class, 'markAsUnread'])->name('markAsUnread');
        });
    });
});
