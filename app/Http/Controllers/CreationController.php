<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CreationController extends Controller
{
    public function create()
    {
        return view('creation');
    }

    public function store(Request $request)
    {
        // Валидация основных данных
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'shortDescription' => 'required|string|max:500',
            'cover_image' => 'required|image|max:2048',
            'dateTime.date' => 'required|date',

            'age_restriction' => 'required|string',
            'is_public'      => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Проверка на дубликаты
        $existingEvent = Event::where('title', $request->input('name'))
            ->where('event_date', $request->input('dateTime.date'))
            ->first();

        if ($existingEvent) {
            return response()->json([
                'success' => false,
                'message' => 'Мероприятие с таким названием и датой уже существует'
            ], 409);
        }

        try {
            // Обработка файла обложки
            $coverPath = null;
            if ($request->hasFile('cover_image')) {
                $coverPath = $request->file('cover_image')->store('events/covers', 'public');
            }

            // Создание события (единственный вызов Event::create)
            $event = Event::create([
                'title' => $request->input('name'),
                'short_description' => $request->input('shortDescription'),
                'full_description' => $request->input('fullDescription', ''),
                'is_online' => $request->input('mode', 'offline') === 'online',
                'location' => $request->input('place', 'Не указано'),
                'event_date' => Carbon::parse($request->input('dateTime.date')),
                'is_published' => !$request->input('isDraft', true),
                'is_draft' => $request->input('isDraft', true),
                'cover_image' => $coverPath,
                'university' => $request->input('university', ''),
                'category' => $request->input('category', 'Другое'),
                'theme' => $request->input('theme', 'Другое'),
                'organizer' => $request->input('creator', 'Не указан'),
                'legal_address' => $request->input('legalAddress', ''),
                'contact_email' => $request->input('email', ''),
                'form_intro_text' => $request->input('formText', ''),
                
                'age_restriction' => $request->input('age_restriction'),
                'is_public'       => $request->input('is_public'),
            ]);

            // Сохранение вопросов
            if ($request->has('customQuestions')) {
                foreach ($request->input('customQuestions') as $question) {
                    $event->questions()->create([
                        'text' => $question['text'],
                        'description' => $question['description'] ?? null
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'eventId' => $event->id,
                'isDraft' => $event->is_draft,
                'redirect' => $event->is_draft ? false : route('home'),
                'message' => $event->is_draft ? 'Черновик сохранен' : 'Мероприятие опубликовано'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка: ' . $e->getMessage()
            ], 500);
        }
    }
}