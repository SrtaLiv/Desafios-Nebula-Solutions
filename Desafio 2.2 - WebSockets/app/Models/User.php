<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasRoles;
    // use MustVerifyEmail;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'provider',
        'provider_id',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
        'provider',
        'provider_id',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            $user->deleteAvatar();
        });

    }

    /* =============== CUSTOM ATTRIBUTES =============== */

    /*
        override avatar attribute
        if starts with http/https, return as is
        else, return asset path (e.g.: /storage/avatars/xyz.jpg)
    */
    public function getAvatarAttribute($value)
    {
        if (is_null($value))
            return null;
        if (preg_match('/^https?:\/\//', $value))
            return $value;
        return asset($value);
    }

    /* =============== CUSTOM METHODS =============== */

    public function deleteAvatar()
    {
        if (!$this->avatar)
            return;
        // if it's an external link (http or https), don't try to delete it
        if (preg_match('/^https?:\/\//', $this->avatar)) {
            $this->update(['avatar' => null]);
            return;
        }
        // delete file from storage if it exists
        if (Storage::disk('public')->exists($this->getRawOriginal('avatar'))) {
            Storage::disk('public')->delete($this->getRawOriginal('avatar'));
        }
        $this->update(['avatar' => null]);
    }

}
