<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('short_description', 500);
            $table->text('full_description');
            $table->boolean('is_online');
            $table->string('location')->nullable();
            $table->string('university')->nullable();
            $table->dateTime('event_date');
            $table->string('category');
            $table->string('theme');
            $table->string('organizer');
            $table->string('legal_address');
            $table->string('contact_email');
            $table->text('form_intro_text')->nullable();
            $table->boolean('is_draft')->default(true);
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            $table->string('cover_image')->nullable();
            
            $table->unique(['title', 'event_date']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
}