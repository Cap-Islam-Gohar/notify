<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class BaseApiController extends Controller
{
    /**
     * Return a success response.
     *
     * @param mixed $data Data to return in the response (optional).
     * @param string $message Success message (optional).
     * @param int $code HTTP status code for the response (default is 200).
     * @return JsonResponse The JSON response with the success status.
     */
    protected function success($data = null, string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,  
            'message' => $message,
            'data'    => $data,  
        ], $code); 
    }

    /**
     * Return an error response.
     *
     * @param string $message Error message to return to the client (optional).
     * @param int $code HTTP status code for the response (default is 400 for a bad request).
     * @param mixed $errors Additional error details (optional).
     * @return JsonResponse The JSON response with the error status.
     */
    protected function error(string $message = 'An error occurred', int $code = 400, $errors = null): JsonResponse
    {
        return response()->json([
            'success' => false,  
            'message' => $message,
            'errors'  => $errors, 
        ], $code); 
    }

    /**
     * Return a "No Content" response.
     *
     * @return JsonResponse The JSON response with no content (HTTP status code 204).
     */
    protected function noContent(): JsonResponse
    {
        return response()->json(null, 204); 
    }

    /**
     * Handle an exception and return a consistent error response.
     *
     * @param Throwable $e The exception that was thrown.
     * @return JsonResponse The error response with a status code 500 (internal server error).
     */
    protected function handleException(Throwable $e): JsonResponse
    {
        Log::error($e);

        $message = app()->environment('production')
            ? 'Internal Server Error'  
            : $e->getMessage(); 

        return $this->error($message, 500); 
    }
}
