<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AuthController extends Controller
{
  public function loginShow()
  {
    return Inertia::render('auth/login');
  }

  public function login(Request $request)
  {
    $r = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:8'
    ]);

    $attempt = Auth::attempt($r, true);

    if ($attempt) {
      $request->session()->regenerate();
      return Redirect::to('/');
    }

    return Inertia::render('auth/login', ['error' => 'Could not login, an error occurred']);
  }

  public function destroy(Request $request)
  {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
  }
}
