<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $events = [
            [
                'id' => 1,
                'name' => 'DPS RKP Golf',
                'venue' => 'Qutab Golf Club, Lado Sarai, New Delhi',
                'date' => date_create('18-08-2022'),
                'time' => 'Morning',
            ],
            [
                'id' => 2,
                'name' => 'DPS RKP - Back to School (18th)',
                'venue' => 'Delhi Public School, R.K. Puram',
                'date' => date_create('18-08-2022'),
                'time' => '4:00pm to 9:30pm',
            ],
            [
                'id' => 3,
                'name' => 'The Great DPS RKP Run (TGD Run)',
                'venue' => 'Delhi Public School, R.K. Puram',
                'date' => date_create('19-08-2022'),
                'time' => 'Morning',
            ],
            [
                'id' => 4,
                'name' => 'DPS RKP - Back to School (19th)',
                'venue' => 'Delhi Public School, R.K. Puram',
                'date' => date_create('19-08-2022'),
                'time' => '4:00pm to 9:30pm',
            ],
            [
                'id' => 5,
                'name' => 'Cultural Extravaganza (20th)',
                'venue' => 'Delhi Public School, R.K. Puram',
                'date' => date_create('20-08-2022'),
                'time' => 'Morning Evening (Slots will be intimidated later)',
            ],
            [
                'id' => 6,
                'name' => 'DPS RKP Alumni Dinner',
                'venue' => 'Khubani, Hotel Andaz, Aerocity, New Delhi',
                'date' => date_create('20-08-2022'),
                'time' => 'Late Evening',
            ],
            [
                'id' => 7,
                'name' => 'Cultural Extravaganza (21st)',
                'venue' => 'Delhi Public School, R.K. Puram',
                'date' => date_create('21-08-2022'),
                'time' => 'Morning Evening (Slots will be intimidated later)',
            ],
        ];

        Event::upsert($events, ['id'], ['name', 'venue', 'date', 'time']);
    }
}
