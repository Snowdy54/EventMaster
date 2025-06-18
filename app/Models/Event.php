<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'short_description',
        'full_description',
        'is_online',
        'location',
        'university',
        'event_date',
        'category',
        'theme',
        'organizer',
        'legal_address',
        'contact_email',
        'form_intro_text',
        'is_draft',
        'is_published',

        'cover_image'
    ];

    public function questions()
    {
        return $this->hasMany(EventQuestion::class);
    }

    public function getCoverUrlAttribute()
    {
        if (!$this->cover_image) {
            return asset('img/default-event.jpg');
        }
        
        return asset('storage/' . $this->cover_image);
    }

    protected $casts = [
    'event_date' => 'datetime',
    'is_published' => 'boolean',
    ];
}