<?php

namespace Database\Seeders;

use App\Models\Avatar;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Avatar::create([
            "avatar" => file_get_contents(public_path("avatars/default.png")),
            "user_id" => null
        ]);
    }
}
