<?php

use App\Http\Controllers\AlumniController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('index');
})->name('home');

// ----- Authentication -----
Route::prefix('/auth')
  ->middleware(['guest'])
  ->name('auth.')
  ->group(function () {
    Route::get('/login', [AuthController::class, 'loginShow'])
      ->name('login');
    Route::post('/login', [AuthController::class, 'login'])
      ->name('handleLogin');
  });
Route::get('/auth/logout', [AuthController::class, 'destroy'])
  ->middleware(['auth'])
  ->name('auth.logout');

// ----- Admin -----
Route::prefix('/admin')
  ->middleware(['auth'])
  ->name('admin.')
  ->group(function () {
    Route::get('/', function () {
      return Inertia::render('admin/index');
    })->name('index');

    Route::resource('events', EventController::class);

    Route::resource('alumnis', AlumniController::class);

    Route::get('/attend-code', [AlumniController::class, 'enter_attend_code']);
    Route::post('/attend-code', [AlumniController::class, 'attend_code']);

    Route::get('/alumnis/{alumni_id}/events/{event_id}', [AlumniController::class, 'alumniEvent']);

    /* Route::get('/alumnis/qrcode/{alumni_id}', [AlumniController::class, 'qrcode']); */
  });

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
