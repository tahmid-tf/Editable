<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            $table->string('category_name');

            $table->decimal('style_price',5,4);
            $table->integer('style_threshold');
//
            $table->decimal('culling_price',5,4);
            $table->integer('culling_threshold');

            $table->decimal('skin_retouch_price',5,4);
            $table->integer('skin_retouch_threshold');

            $table->decimal('preview_edit_price',5,4);
            $table->integer('preview_edit_threshold');
//
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
        Schema::dropIfExists('categories');
    }
}
