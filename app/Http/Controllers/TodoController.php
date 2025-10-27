<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{

    /**
     * Display a paginated listing of the todos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $todos = Todo::paginate($perPage);

        return Inertia::render('todos/index', [
            'todos' => $todos,
        ]);
    }

    /**
     * Show the form for creating a new todo.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('todos/create');
    }

    /**
     * Store a newly created todo.
     *
     * @param  \App\Http\Requests\TodoRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(TodoRequest $request)
    {
        $validated = $request->validated();

        Todo::create($validated);

        return redirect()->route('todos.index')->with('success', 'Todo created successfully.');
    }

    /**
     * Show the form for editing the specified todo.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Inertia\Response
     */
    public function edit(Todo $todo)
    {
        return Inertia::render('todos/edit', [
            'todo' => $todo,
        ]);
    }

    /**
     * Update the specified product.
     *
     * @param  \App\Http\Requests\TodoRequest  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        $validated = $request->validated();

        $todo->update($validated);

        return redirect()->route('todos.index')->with('success', 'Todo updated successfully.');
    }

    /**
     * Remove the specified todo.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->route('todos.index')->with('success', 'Todo deleted.');
    }

    /**
     * mark todo as completed.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function markAsCompleted(Request $request)
    {
        $ids = $request->input('ids', []);
        Todo::whereIn('id', $ids)->update(['completed_at' => now()]);
        return redirect()->route('todos.index')->with('success', 'Todo marked as completed.');
    }
}
