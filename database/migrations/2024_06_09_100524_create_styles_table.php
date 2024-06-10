<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStylesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('styles', function (Blueprint $table) {
            $table->id();

            $table->string('style_name');
            $table->text('description');
            $table->string('upload_image');
            $table->json('categories')->nullable();
            $table->enum('additional_style', ['yes', 'no']);
            $table->enum('culling', ['yes', 'no']);
            $table->enum('skin_retouch', ['yes', 'no']);
            $table->enum('preview_edits', ['yes', 'no']);

            $table->softDeletes();
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
        Schema::dropIfExists('styles');
    }
}
