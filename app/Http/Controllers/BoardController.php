<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;

class BoardController extends Controller
{
    public function getBoard() {
        $gameId = GameUser::where("user_id", auth()->id())->first()->game_id;
        $game = Game::where("id", $gameId)->first();

        return response()->json(["board" => $game->board]);
    }
}
