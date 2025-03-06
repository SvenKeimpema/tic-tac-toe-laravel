<?php

use \App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');
    Route::get('/play/online', function () {
        return Inertia::render('matchmaking');
    });
    Route::get('/play/match', function () {
        return Inertia::render('game');
    });
    Route::post('/game/matchmake', [GameController::class, "matchmake"])->name('game.join');
    Route::post('/game/found', [GameController::class, "found"])->name('game.found');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
