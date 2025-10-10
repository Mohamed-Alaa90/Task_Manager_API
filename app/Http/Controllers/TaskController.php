<?php

namespace App\Http\Controllers;

use  Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks;
        return response()->json([
            'status' => 'success',
            'data' => [
                'tasks' => $tasks
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pending,completed',
            'priority' => 'sometimes|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $task = $request->user()->tasks()->create($validated);
        return response()->json([
            'status' => 'success',
            'data' => [
                'task' => $task
            ]
        ]);
    }

    public function show(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }
        return response()->json([
            'status' => 'success',
            'data' => [
                'task' => $task
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }
        $validated = $request->validate(
            [
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'status' => 'sometimes|in:pending,completed',
                'priority' => 'sometimes|in:low,medium,high',
                'due_date' => 'nullable|date',
            ]
        );

        $task->update($validated);
        return response()->json(
            [
                'status' => 'success',
                'data' => [
                    'task' => $task
                ]
            ]
        );
    }

    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ]);
        }


        $task->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted successfully'
        ]);
    }
}
