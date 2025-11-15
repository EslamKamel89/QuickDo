<?php

namespace Modules\Tasks\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory {
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = \Modules\Tasks\Models\Task::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->optional()->paragraph(),
            'done' => $this->faker->boolean(20),
            'due_at' => $this->faker->dateTimeBetween('now', '+60 days',),
        ];
    }
}
