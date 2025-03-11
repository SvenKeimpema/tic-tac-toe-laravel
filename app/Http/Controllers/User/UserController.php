<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsername()
    {
        return response()->json(['username' => auth()->user()->name]);
    }

    public function updateUsername(Request $request)
    {
        $user = auth()->user();
        $user->name = $request->username;
        $user->save();

        return response()->json(['username' => $user->name]);
    }
}