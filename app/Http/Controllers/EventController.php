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
    public function index(Request $request)
    {
        if (auth()->check()) {
            if (auth()->user()->email === "golf@dpsrkp.net") {
                return Inertia::render('admin/events/index', [
                    'events' => Event::where('id', 1)->get(),
                ]);
            }
            return Inertia::render('admin/events/index', [
                'events' => Event::all(),
            ]);
        }
    }

    /*
     * Display the specified event
     *
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        if (auth()->check()) {
            if (auth()->user()->email === "golf@dpsrkp.net") {
                if ($event->id !== 1) {
                    return redirect("/admin/events/1");
                }
            }
            return Inertia::render('admin/events/event', [
                'id' => $event->id,
                'name' => $event->name,
                'venue' => $event->venue,
                'date' => $event->date,
                'time' => $event->time,
                'alumnis' => $event->alumnis,
                'number_of_alumnis' => $event->alumnis->count(),
            ]);
        }
    }
}
