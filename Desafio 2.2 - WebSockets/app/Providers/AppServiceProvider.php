<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // force HTTPS redirect 
        if (config('app.force_https')) {
            URL::forceScheme('https');
        }

        // disable json "data" key wrapping
        JsonResource::withoutWrapping();

        // implicitly grant all abilities to "super" role users
        // (https://spatie.be/docs/laravel-permission/v6/basic-usage/super-admin)
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super') ? true : null;
        });

    }
}
