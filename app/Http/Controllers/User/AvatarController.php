<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function getAvatar() {
        $avatar = Avatar::where("user_id", auth()->id())->first();

        if(!$avatar) {
            $avatar = Avatar::where("user_id", null)->first();
        }

        return response()->json(["avatar" => [
            "image" => base64_encode($avatar->avatar)
        ]]);
    }

    public function uploadAvatar(Request $request) {
        $request->validate([
            'avatar' => 'required|file|max:25600'
        ]);

        $uploadedFile = $request->file('avatar');
        $fileContents = file_get_contents($uploadedFile->getRealPath());
        
        $avatar = new Avatar();
        $avatar->avatar = $fileContents;
        $avatar->user_id = auth()->id();
        $avatar->save();
        
        return response()->json(['message' => 'Avatar uploaded successfully']);
    }
}