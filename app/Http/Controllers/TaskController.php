<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use  Illuminate\Http\JsonResponse as json;
class TaskController extends Controller
{
    public function index(Request $request):json
    {
        $tasks = $request->user()->tasks;
        return response()->json([
            'status' => 'success',
            'data' => [
                'tasks' => $tasks
            ]
        ]);
    }

    public function store(Request $request): json
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

    public function show(Request $request,$id): json
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task){
            return response()->json([
                'status'=>'error',
                'message'=>'Task not found'
            ]);
        }
        return response()->json([
            'status'=>'success',
            'data'=>[
                'task'=>$task
            ]
        ]);
    }
}
