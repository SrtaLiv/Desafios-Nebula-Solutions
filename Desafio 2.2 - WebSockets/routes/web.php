<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

use App\Events\TestMessage;

Route::get('/broadcast-test', function () {
    broadcast(new TestMessage('Hello from Laravel!'));
    return 'Message broadcasted!';
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
