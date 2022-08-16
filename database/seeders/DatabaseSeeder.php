<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    (new \App\Models\User([
      'name' => 'DPS RKP',
      'email' => 'admin@dpsrkp.net',
      'password' => Hash::make('dpsrkp50y3@r'),
    ]))->save();
    (new \App\Models\User([
      'name' => 'DPS RKP Golf',
      'email' => 'golf@dpsrkp.net',
      'password' => Hash::make('Golf@DPSRKP'),
    ]))->save();
    $this->call([
      EventSeeder::class,
    ]);
  }
}
