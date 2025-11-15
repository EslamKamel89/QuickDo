<?php

namespace Modules\Tasks\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Tasks\Database\Factories\TaskFactory;

class Task extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "user_id",
        "title",
        "description",
        "done",
        "due_at",
    ];
    protected $casts = [
        'done' => 'boolean',
        'due_at' => 'date',
    ];
    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
    protected static function newFactory(): TaskFactory {
        return TaskFactory::new();
    }
}
