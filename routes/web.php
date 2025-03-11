<?php

use \App\Http\Controllers\GameController;
use \App\Http\Controllers\MatchmakingController;
use \App\Http\Controllers\MoveController;
use \App\Http\Controllers\BoardController;
use \App\Http\Controllers\User\AvatarController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\UserController;
use \App\Models\GameUser;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Game Routes
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
        $game = GameUser::where("user_id", auth()->id())->first();
        if(!$game) {
            return redirect()->route('home');
        }
        return Inertia::render('matchmaking');
    })->name('matchmaking');
    Route::get('/play/match', function () {
        $game = GameUser::where("user_id", auth()->id())->first();
        if(!$game) return redirect()->route('home');

        $game = GameUser::where("game_id", $game->game_id)->get();

        if($game->count() < 2) return redirect()->route('matchmaking');

        return Inertia::render('game');

    })->name('game.play');
});

Route::middleware(['auth', 'verified'])->group(function () {    
    Route::post('/game/matchmake', [MatchmakingController::class, "matchmake"])->name('game.join');
    Route::post('/game/found', [MatchmakingController::class, "found"])->name('game.found');
    Route::post('/game/users', [GameController::class, "getConnectedUsers"])->name('game.users');
    Route::post('/game/move', [MoveController::class, "move"])->name('game.move');
    Route::post('/game/board', [BoardController::class, "getBoard"])->name('game.board');
});

// User Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('user.profile');

    Route::post('user/profile', [ProfileController::class, "updateProfile"])->name('user.profile.update');

    Route::get('/user/avatar', [AvatarController::class, "getAvatar"])->name('user.avatar');
    Route::post('/user/avatar', [AvatarController::class, "uploadAvatar"])->name('user.avatar.upload');

    Route::get('/user/profile/username', [UserController::class, "getUsername"])->name('user.profile.username');
    Route::post('/user/profile/username', [UserController::class, "updateUsername"])->name('user.profile.username.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
