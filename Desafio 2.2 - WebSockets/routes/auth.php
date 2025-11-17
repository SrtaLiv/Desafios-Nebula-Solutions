<?php

use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

/* ================ OAuth Routes ================ */
Route::get('/auth/google/redirect', [OAuthController::class, 'redirectToGoogleOAuth']);
Route::get('/auth/google/callback', [OAuthController::class, 'handleGoogleCallback']);