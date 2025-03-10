<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;
use Illuminate\Http\Request;

class MoveController extends Controller
{
    public function move(Request $request) {
        $gameId = GameUser::where("user_id", auth()->id())->first()->game_id;
        
        $game = Game::where("id", $gameId)->first();

        if($game->turn != auth()->id()) {
            return response()->json(["error" => "It's not your turn"]);
        }

        $turn = $this->getBitCount($game->board) % 2;

        $game->board |= 1 << ($request->index*2+$turn);
        
        // switch turn
        $users = GameUser::where("game_id", $gameId)->get();
        $game->turn = $users->where("user_id", "!=", auth()->id())->first()->user_id;

        $game->save();

        return response()->json(["success" => true]);
    }

    private function getBitCount($value) {
        $count = 0;
        while($value) {
            $count += $value & 1;
            $value >>= 1;
        }
        return $count;
    }
}