<?php

use \App\Http\Controllers\GameController;
use \App\Models\GameUser;
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
        $game = GameUser::where("user_id", auth()->id())->first();
        if($game) {
            return Inertia::render('game');
        }
        return redirect()->route('home');
    });
    Route::post('/game/matchmake', [GameController::class, "matchmake"])->name('game.join');
    Route::post('/game/found', [GameController::class, "found"])->name('game.found');
    Route::post('/game/users', [GameController::class, "userNames"])->name('game.users');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
