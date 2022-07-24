<?php

use App\Http\Controllers\AlumniController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/attend', [AlumniController::class, 'attend']);
Route::post('/attend-code', [AlumniController::class, 'attend_code_api']);
Route::post('/change-number-of-members', [AlumniController::class, 'changeNumberOfMembers']);
