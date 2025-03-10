<?php

use \App\Http\Controllers\GameController;
use \App\Models\GameUser;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        $game = GameUser::where("user_id", auth()->id())->first();
        if($game) {
            // we are unsure here if there is a user already connected to the game so we redirect to the matchmaking page which does this validation for us
            return redirect()->route('matchmaking');
        }
        return Inertia::render('welcome');
    })->name('home');
    Route::get('/play/online', function () {
        return Inertia::render('matchmaking');
    })->name('matchmaking');
    Route::get('/play/match', function () {
        $game = GameUser::where("user_id", auth()->id())->first();
        if(!$game) return redirect()->route('home');

        $game = GameUser::where("game_id", $game->game_id)->get();

        if($game->count() < 2) return redirect()->route('matchmaking');

        return Inertia::render('game');

    })->name('game.play');
    Route::post('/game/matchmake', [GameController::class, "matchmake"])->name('game.join');
    Route::post('/game/found', [GameController::class, "found"])->name('game.found');
    Route::post('/game/users', [GameController::class, "userNames"])->name('game.users');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
