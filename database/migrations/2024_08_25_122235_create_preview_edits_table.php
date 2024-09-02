<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreviewEditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preview_edits', function (Blueprint $table) {
            $table->id();

            $table->string('order_id');
            $table->text('comment')->nullable();
            $table->text('preview_link')->nullable();
            $table->enum('users_decision',['accepted','rejected'])->nullable();
            $table->timestamp('users_decision_date')->nullable();

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
        Schema::dropIfExists('preview_edits');
    }
}
