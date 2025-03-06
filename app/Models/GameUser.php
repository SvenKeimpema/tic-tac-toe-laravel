<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameUser extends Model
{
    protected $table = "game_users";
    protected $primaryKey = "id";
    protected $fillable = ["game_id", "user_id"];
    public $timestamps = true;
    public $incrementing = true;
}
