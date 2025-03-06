<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;

class GameController extends Controller
{

    private function create() {
        $game_id = Game::create(["move_time" => 30000])->id;
        return $game_id;
    }

    private function join($game_id) {
        GameUser::create(["game_id" => $game_id, "user_id" => auth()->id()]);
    }

    public function matchmake()
    {
//      First we need to try to find if someone already has created a game
        $games = GameUser::all(["game_id", "user_id"])
            ->groupBy('game_id')
            ->filter(function ($gameUsers) {
                return $gameUsers->count() < 2;
            })
            ->keys();

        if($games->count() > 0) {
            $game = $games[0];
        }else {
            $game = $this->create();
        }

        $this->join($game);

        return response("success", 200);
    }

    public function found() {
        $games = GameUser::all(["game_id", "user_id"])->groupBy('game_id')->filter(function ($gameUsers) {
            $userId = auth()->id();

            foreach ($gameUsers as $gameUser) {
                if($gameUser->user_id == $userId) {
                    return $gameUsers->count() > 1;
                }
            }

            return false;
        });

        return response()->json(["found" => $games->count() > 0]);
    }
}
