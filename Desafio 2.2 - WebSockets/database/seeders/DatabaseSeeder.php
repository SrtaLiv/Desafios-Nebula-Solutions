<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /* ========================== CREATE ROLES & PERMISSIONS ========================== */
        
        $roles = [
            'super',
            'admin',
            'user'
        ];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $permissions = [
            'manage_users',
            'view_dashboard'
        ];
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        Role::findByName('admin')->syncPermissions(['manage_users', 'view_dashboard']); 


        /* ========================== CREATE TEST USERS ========================== */
        
        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123123'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('super');

        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@user.com',
            'password' => Hash::make('123123'),
            'email_verified_at' => now(),
        ]);
        $user->assignRole('user');

    }
}
