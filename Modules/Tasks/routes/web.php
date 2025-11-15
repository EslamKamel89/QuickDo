<?php

use Illuminate\Support\Facades\Route;
use Modules\Tasks\Http\Controllers\TasksController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/tasks/export', [TasksController::class, 'exportCsv'])->name('tasks.export');
    Route::resource('tasks', TasksController::class)->names('tasks');
});
