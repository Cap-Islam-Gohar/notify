<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;


/**
 * @group Todos
 * 
 * APIs for managing todos.
 */
class TodoApiController extends BaseApiController
{
    /**
     * List todos
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $todos = Todo::paginate($perPage);

        return TodoResource::collection($todos);
    }

    /**
     * Create a todo
     * 
     *
     * @param \App\Http\Requests\TodoRequest  $request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TodoRequest $request)
    {
        $validated = $request->validated();


        $todo = Todo::create($validated);

        return $this->success(new TodoResource($todo), 'Todo created successfully', 201);
    }

    /**
     * Show a todo
     *
     * @param Todo $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Todo $todo)
    {
        return new TodoResource($todo);
    }

    /**
     * Update a todo
     *
     * @param \App\Http\Requests\TodoRequest  $request
     * @param Todo $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        $validated = $request->validated();

        $todo->update($validated);

        return $this->success(new TodoResource($todo), 'Todo updated successfully');
    }

    /**
     * Delete a todo
     *
     * @param Todo $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return $this->noContent();
    }

    /**
     * Mark a todo as completed
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsCompleted(Request $request)
    {
        $ids = $request->input('ids', []);

        Todo::whereIn('id', $ids)->update(['completed_at' => now()]);

        return $this->noContent();
    }
}
