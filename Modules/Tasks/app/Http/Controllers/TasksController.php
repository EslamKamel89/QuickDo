<?php

namespace Modules\Tasks\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Modules\Tasks\Http\Requests\TaskRequest;
use Modules\Tasks\Models\Task;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TasksController extends Controller {

    public function index(Request $request) {
        $perPage = $request->integer('per_page', 10);
        [$taskQuery, $q, $done] = $this->buildTaskQuery($request);
        $tasks = $taskQuery->paginate($perPage)->withQueryString();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'filters' => array_filter([
                'q' => $q->toString(),
                'done' => $request->has('done') ? $done : null,
            ], fn($a) => $a !== null)
        ]);
    }

    public function create() {
        return Inertia::render('Tasks/Create',);
    }

    public function store(TaskRequest $request) {
        $validated = $request->validated();
        auth()->user()->tasks()->create($validated);
        return redirect()->route('tasks.index')->with('success', 'Task created');
    }

    public function show(Task $task) {
        $task->load(['owner']);
        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    public function edit(Task $task) {
        $task->load(['owner']);
        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    public function update(TaskRequest $request, Task $task) {
        Gate::authorize('update', $task);
        $validated = $request->validated();
        $task->update($validated);
        return redirect()->route('tasks.index')->with('success', 'Task Updated');
    }

    public function destroy(Task $task) {
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Task deleted');
    }

    public function exportCsv(Request $request): StreamedResponse {
        $filename = 'tasks_export_' . date('Ymd_His') . '.csv';
        return response()->stream(
            callback: function () use ($request) {
                $handle = fopen('php://output', 'w');
                fputcsv($handle, ['id', 'title', 'description', 'done', 'due_date', 'user_email', 'created_at']);
                [$taskQuery, $q, $done]  = $this->buildTaskQuery($request);
                $taskQuery->chunk(200, function ($tasks) use ($handle) {
                    foreach ($tasks as $task) {
                        fputcsv($handle, [
                            $task->id,
                            $task->title,
                            $task->description,
                            $task->done ? '1' : '0',
                            optional($task->due_date)->format('Y-m-d'),
                            $task->owner->email ?? '',
                            $task->created_at->toDateTimeString(),
                        ]);
                    }
                });
                fclose($handle);
            },
            status: 200,
            headers: [
                'Content-Type' => 'text/csv; charset=UTF-8',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            ],
        );
    }
    /**
     * Summary of buildTaskQuery
     * @param \Illuminate\Http\Request $request
     * @return array{0:Builder<Task> , 1:\Illuminate\Support\Stringable|null , 2:bool|null}
     */
    protected function buildTaskQuery(Request $request): array {
        $q = $request->string('q', null)?->trim();
        $done = $request->get('done');
        $taskQuery = Task::with(['owner'])->orderByDesc('id');
        if ($request->has('q')) {
            $taskQuery->where(
                function (Builder $query) use ($q) {
                    $query->where('title', 'LIKE', "%{$q}%")
                        ->orWhere('description', 'LIKE', "%{$q}%");
                }
            );
        }
        if ($request->has('done') && $done !== null) {
            $taskQuery->where('done', (bool)$done);
        }
        return [$taskQuery, $q, $done];
    }
}
