<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Tasks\Database\Seeders\TaskSeeder;
use Modules\Tasks\Models\Task;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        User::factory()->count(10)->create();
        $this->call(TaskSeeder::class);
    }
}
