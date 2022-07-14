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
        $sheetsIds = [
            '0',
            '1189229867',
            '207796124',
            '582614324',
            '294719872',
            '1504129151',
            '1092839657',
        ];
        $sheetURLS = [
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vQho_ZLTkE00Y_6GD99AJyR4D-t2zvr36fWOhoemh5Z8rJ95uhDLIsLDl-s-UwItmJ_QbfS13cjpDch/pub?gid=0&single=true&output=tsv', // my own sample
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTNWbi0rM3KCTtvQ4gYxuG7B6aeeY1eMdlcyAkcfIauC4-umIFQt9SHwDBH8bzg16vtkgD9T3YSfzo/pub?gid=1705908244&single=true&output=tsv',
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTDGjhZIrksNshu3HXy82GDPswM5iZzi_IdcQ0wzOrHQKJEOBVoHVpjs2hVGBLUOHDhFvM1-Q7FDVy/pub?gid=1215260649&single=true&output=tsv',
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTNWbi0rM3KCTtvQ4gYxuG7B6aeeY1eMdlcyAkcfIauC4-umIFQt9SHwDBH8bzg16vtkgD9T3YSfzo/pub?gid=1674780203&single=true&output=tsv',
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdMm6Mddg1G1VieAj91JJjJGEfyzQec6qG5hReNkkCxNCGW9-WqQlL6rFistEFH4TH7Jj2NzBjzb-l/pub?gid=827809265&single=true&output=tsv',
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vQho_ZLTkE00Y_6GD99AJyR4D-t2zvr36fWOhoemh5Z8rJ95uhDLIsLDl-s-UwItmJ_QbfS13cjpDch/pub?gid=1092839657&single=true&output=tsv', // my own sample
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdMm6Mddg1G1VieAj91JJjJGEfyzQec6qG5hReNkkCxNCGW9-WqQlL6rFistEFH4TH7Jj2NzBjzb-l/pub?gid=694575293&single=true&output=tsv',
        ];
        for ($i = 0; $i < count($sheetURLS); $i++) {
            $sheetURL = $sheetURLS[$i];
            $sheetContent = explode("\r\n", file_get_contents($sheetURL));
            $lines = array_slice($sheetContent, 1);
            $now = Carbon::now('Asia/Kolkata');
            foreach ($lines as $line) {
                $row = str_getcsv($line, "\t");
                $gender = $row[6];
                if ($i == 5) {
                    $gender == null;
                }
                $alumni = Alumni::firstOrCreate(
                    ['email' => $row[1]],
                    [
                        'name' => $row[3],
                        'passing_year' => $row[4],
                        'mobile' => $row[5],
                        'gender' => $gender,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
                $event = Event::find($i + 1);
                $number_of_members = 1;
                if ($i == 0) {
                    if ($row[9] == "YES") {
                        $number_of_members = 4;
                    }
                } else if ($i == 2) {
                    $number_of_members = 1;
                } else {
                    $number_of_members = $row[9];
                }
                $alumni->events()->attach($event, ['number_of_members' => $number_of_members, 'number_of_members_final' => $number_of_members]);
            }
        }
    }
}
