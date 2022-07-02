<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display a list of all events
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('admin/events/index', [
            'events' => Event::all(),
        ]);
    }

    /*
     * Display the specified event
     *
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        return Inertia::render('admin/events/event', [
            'id' => $event->id,
            'name' => $event->name,
            'venue' => $event->venue,
            'date' => $event->date,
            'time' => $event->time,
            'alumnis' => $event->alumnis,
        ]);
    }
}
