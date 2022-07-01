<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlumniEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alumni_event', function (Blueprint $table) {
            $table->id();
            $table->string('alumni_id');
            $table->foreign('alumni_id')
                ->references('id')
                ->on('alumnis')->onDelete('cascade');

            $table->string('event_id');
            $table->foreign('event_id')
                ->references('id')
                ->on('events')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumni_event');
    }
}
