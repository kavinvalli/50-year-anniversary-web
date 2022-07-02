<?php

namespace Database\Seeders;

use App\Models\Alumni;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AlumniSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* $sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQho_ZLTkE00Y_6GD99AJyR4D-t2zvr36fWOhoemh5Z8rJ95uhDLIsLDl-s-UwItmJ_QbfS13cjpDch/pub?gid=0&single=true&output=tsv'; */
        $sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQho_ZLTkE00Y_6GD99AJyR4D-t2zvr36fWOhoemh5Z8rJ95uhDLIsLDl-s-UwItmJ_QbfS13cjpDch/pub?gid=1189229867&single=true&output=tsv';
        $sheetContent = explode("\r\n", file_get_contents($sheetURL));
        $lines = array_slice($sheetContent, 1);
        /* $rows = collect(); */
        $now = Carbon::now('Asia/Kolkata');
        foreach ($lines as $line) {
            $row = str_getcsv($line, "\t");
            $alumni = Alumni::firstOrCreate(
                ['email' => $row[0]],
                [
                    'name' => $row[1],
                    'passing_year' => $row[2],
                    'mobile' => $row[3],
                    'gender' => $row[4],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
            $event = Event::find(1);
            $alumni->events()->attach($event);
            /* Alumni::create([ */
            /*     'email' => $row[0], */
            /*     'name' => $row[1], */
            /*     'passing_year' => $row[2], */
            /*     'mobile' => $row[3], */
            /*     'gender' => $row[4], */
            /*     'created_at' => $now, */
            /*     'updated_at' => $now, */
            /* ]); */
        }
    }
}
