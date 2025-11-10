<?php

namespace Modules\Tasks\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasksController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('Tasks/Index', [
            'initial' => [
                'message' => 'Tasks Index (wired via module route)',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('Tasks/Create', [
            'initial' => [
                'message' => 'Tasks Create (wired via module route)',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        return back()->with('success', 'Not implemented yet');
    }

    /**
     * Show the specified resource.
     */
    public function show($id) {
        return Inertia::render('Tasks/Show', [
            'initial' => [
                'message' => 'Tasks Show (wired via module route)',
                'id' => (int)$id,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {
        return Inertia::render('Tasks/Edit', [
            'initial' => [
                'message' => 'Tasks Edit (wired via module route)',
                'id' => (int)$id,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        return back()->with('success', 'Not implemented yet');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        return back()->with('success', 'Not implemented yet');
    }
}
