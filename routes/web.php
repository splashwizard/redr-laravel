<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about-us', function () {
    return Inertia::render('about-us');
})->name('about-us');

Route::get('/pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::get('/pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('user-profile', function () {
        return Inertia::render('user-profile');
    })->name('user-profile');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
