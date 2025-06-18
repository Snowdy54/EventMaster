<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function index()
    {
        // Ближайшие 5 мероприятий (не включая прошедшие)
        $upcomingEvents = Event::where('is_published', true)
            ->where('event_date', '>=', Carbon::now())
            ->orderBy('event_date', 'asc')
            ->take(5)
            ->get();

        // Все остальные опубликованные мероприятия (кроме уже показанных в ближайших)
        $otherEvents = Event::where('is_published', true)
            ->whereNotIn('id', $upcomingEvents->pluck('id'))
            ->orderBy('event_date', 'asc')
            ->get();

        return view('home', [
            'upcomingEvents' => $upcomingEvents,
            'otherEvents' => $otherEvents
        ]);
    }
}