<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            //            users general info

            $table->string('users_email');
            $table->string('users_phone');
            $table->enum('order_type', ['standard', 'express', 'custom']);
            $table->string('order_name');
            $table->integer('category_id');
            $table->enum('payment_status', ['pending', 'successful', 'failed']);

            //            sorting from orders table

            $table->date('order_date')->nullable();
            $table->string('order_id')->nullable();
            $table->string('amount');
            $table->string('editors_id')->nullable();
            $table->enum('order_status', ['pending', 'completed', 'cancelled', 'preview'])->default('pending');
            $table->string('file_uploaded_by_user')->nullable();
            $table->string('file_uploaded_by_admin_after_edit')->nullable();

            //            styles information

            $table->json('styles_array');
            $table->integer('number_of_images_provided');
            $table->enum('culling', ['yes', 'no'])->nullable();
            $table->string('images_culled_down_to')->nullable();
            $table->string('select_image_culling_type')->nullable();

            $table->enum('skin_retouching', ['yes', 'no'])->nullable();
            $table->string('skin_retouching_type')->nullable();

            $table->enum('additional_info', ['yes', 'no'])->nullable();
            $table->enum('preview_edits', ['yes', 'no'])->nullable();


//            Users Info

            $table->string('user_id')->nullable();

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
        Schema::dropIfExists('orders');
    }
}
