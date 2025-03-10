<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;
use App\Models\User;

class GameController extends Controller
{
    public function getConnectedUsers() {
        $gameId = GameUser::where("user_id", auth()->id())->first()->game_id;
        $users = GameUser::where("game_id", $gameId)->get();
        $userNames = User::whereIn("id", $users->pluck("user_id"))->pluck("name");

        return response()->json(["userNames" => $userNames]);
    }

    private function create() {
        $game_id = Game::create(["board" => 0])->id;
        return $game_id;
    }

    private function join_game($game_id) {
        GameUser::create(["game_id" => $game_id, "user_id" => auth()->id()]);
    }
}