<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlumniController extends Controller
{
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
