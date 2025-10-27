<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends BaseApiController
{
    /**
     * @group Authentication
     * APIs for user authentication (register, login, logout, current user)
     */

    /**
     * Register a new user
     *
     * @unauthenticated
     *
     *
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            $token = $user->createToken('YourAppName')->plainTextToken;

            return $this->success([
                'token' => $token,
                'user' => $user
            ], 'User created successfully', 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Log in a user
     *
     * @unauthenticated
     *
     * @bodyParam email string required The user's email. Example: test@example.com
     * @bodyParam password string required The user's password. Example: password
     *
     * @response 200 {
     *   "message": "Login successful.",
     *   "token": "string",
     *   "user": { "id": 1, "name": "G Bailey", "email": "test@example.com" }
     * }
     * @response 401 {
     *   "message": "Invalid credentials"
     * }
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $user = User::where('email', $validated['email'])->first();

            if (!$user || !Hash::check($validated['password'], $user->password)) {
                return $this->error('Invalid credentials', 401);
            }

            $token = $user->createToken('YourAppName')->plainTextToken;

            return $this->success([
                'token' => $token,
                'user' => $user
            ], 'Login successful', 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Log out a user
     *
     * @authenticated
     *
     * @response 200 {
     *   "message": "Logged out successfully"
     * }
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->success(null, 'Logged out successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Show the authenticated user
     *
     * @authenticated
     *
     * @response 200 {
     *   "id": 1,
     *   "name": "G Bailey",
     *   "email": "test@example.com"
     * }
     */
    public function user(Request $request)
    {
        return $this->success($request->user());
    }
}
