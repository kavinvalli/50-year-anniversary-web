<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Event;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class AlumniController extends Controller
{
    /**
     * Display a list of all alumnis
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('admin/alumnis/index', [
            'alumnis' => Alumni::all(),
        ]);
    }

    /*
     * Display the specified alumni
     *
     * @param \App\Models\Alumni $alumni
     * @return \Illuminate\Http\Response
     */
    public function show(Alumni $alumni)
    {
        /* $image = QrCode::size(150)->format('png')->merge(env('APP_URL') . '/img/logo.png', .5, true)->gradient(0, 0, 0, 190, 148, 74, 'radial')->generate($alumni->id); */
        /* $image = QrCode::size(150)->format('png')->errorCorrection('H')->merge(env('APP_URL') . '/img/logo.png', .5, true)->gradient(0, 0, 0, 190, 148, 74, 'radial')->generate(json_encode(['id' => $alumni->id, 'name' => $alumni->name])); */
        /* $image = QrCode::size(150)->format('png')->gradient(0, 0, 0, 190, 148, 74, 'radial')->generate(json_encode(['id' => $alumni->id, 'name' => $alumni->name])); */
        return Inertia::render('admin/alumnis/alumni', [
            'id' => $alumni->id,
            'name' => $alumni->name,
            'email' => $alumni->email,
            'passing_year' => $alumni->passing_year,
            'mobile' => $alumni->mobile,
            'gender' => $alumni->gender,
            'events' => $alumni->events,
            /* 'qrcode' => base64_encode($image), */
        ]);
    }

    public function alumniEvent($alumni_id, $event_id, Request $request)
    {
        $alumni = Alumni::find($alumni_id);
        $event = Event::find($event_id);
        $alumni_event = $alumni->events->where('id', $event_id)->first();
        /* $image = QrCode::size(150)->format('png')->errorCorrection('H')->merge(env('APP_URL') . '/img/logo.png', .5, true)->gradient(0, 0, 0, 190, 148, 74, 'radial')->generate(json_encode([ */
        /*     'id' => $alumni->id, */
        /*     'name' => $alumni->name, */
        /*     'passing_year' => $alumni->passing_year, */
        /*     'gender' => $alumni->gender, */
        /*     'mobile' => $alumni->mobile, */
        /*     'event_id' => $event->id, */
        /* ])); */
        $image = QrCode::size(200)->gradient(0, 0, 0, 190, 148, 74, 'radial')->generate(json_encode([
            'id' => $alumni->id,
            'name' => $alumni->name,
            'passing_year' => $alumni->passing_year,
            'gender' => $alumni->gender,
            'mobile' => $alumni->mobile,
            'event_id' => $event->id,
        ]));
        return Inertia::render('admin/alumnis/event', [
            'alumni' => $alumni,
            'event' => $event,
            'alumni_event' => $alumni_event,
            'back' => $request->query('back') ? $request->query('back') : '/admin/events',
            'qrcode' => $image->toHTML(),
        ]);
    }

    /* public function qrcode($alumni_id, $event_id) */
    /* { */
    /*       return QrCode::size(300)->generate(json_encode(['alumni_id' => $alumni->id, 'alumni_name' => $alumni->name, ])); */
    /* } */

    public function attend(Request $request)
    {
        $event_id = $request->input("eventId");
        $alumni_id = $request->input("alumniId");

        try {
            DB::table('alumni_event')->where('event_id', $event_id)->where('alumni_id', $alumni_id)->update(['attended' => true]);
            return response()->json([
                'success' => true,
                'message' => ''
            ]);
        } catch (Exception $err) {
            return response()->json([
                'success' => false,
                'message' => $err->getMessage(),
            ]);
        }
    }
}
