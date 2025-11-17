<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{

    public function redirectToGoogleOAuth()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            $socialiteUser = Socialite::driver('google')->user();
            $localUser = User::where('provider_id', $socialiteUser->getId())->first();

            // if no user found, create new user
            if (!$localUser) {
                $localUser = User::create([
                    'name'              => $socialiteUser->getName() ?? $socialiteUser->getNickname() ?? $socialiteUser->getId(),
                    'email'             => $socialiteUser->getEmail(),
                    'avatar'            => $socialiteUser->getAvatar(),
                    'provider'          => 'google',
                    'provider_id'       => $socialiteUser->getId(),
                    'password'          => bcrypt(uniqid()), // random unguessable password
                    'email_verified_at' => now(),
                ]);
            }

            Auth::login($localUser);
            return redirect()->intended('/');

        } catch (Exception $e) {
            Log::error('Google OAuth Error: ' . $e->getMessage());
            return redirect('/login')->withErrors(['oauth_error' => 'Authentication failed']);
        }
    }

}
