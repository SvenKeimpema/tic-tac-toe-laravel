<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameUser;
use App\Models\User;
use Illuminate\Http\Request;
class GameController extends Controller
{

    private function create() {
        $game_id = Game::create(["board" => 0])->id;
        return $game_id;
    }

    private function join($game_id) {
        error_log($game_id);
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

    public function userNames() {
        $gameId = GameUser::where("user_id", auth()->id())->first()->game_id;
        $users = GameUser::where("game_id", $gameId)->get();
        $userNames = User::whereIn("id", $users->pluck("user_id"))->pluck("name");

        return response()->json(["userNames" => $userNames]);
    }

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

    function getBoard() {
        $gameId = GameUser::where("user_id", auth()->id())->first()->game_id;
        $game = Game::where("id", $gameId)->first();
        return $game->board;
    }

    function getBitCount($value) { $count = 0; while($value) { $count += ($value & 1); $value = $value >> 1; } return $count; }
}
