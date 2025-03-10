<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;

class MatchmakingController extends Controller
{
    public function matchmake()
    {
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

        $game = Game::where("id", $game)->first();
        
        // TODO: for now the turn of the player is the first one to join the game, this is probably the last person that connects to the game
        // TODO: we should probably change to be random
        if($game->turn == null) {
            $game->turn = auth()->id();
        }
        error_log($game->turn);
        $game->save();
        $this->join($game->id);

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