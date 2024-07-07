<?php

namespace Database\Seeders;

use App\Models\Api\Admin\Order;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServerOrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::truncate();

        $faker = Faker::create();

        foreach (range(1, 100) as $index) {
            DB::table('orders')->insert([
                'users_email' => $faker->email,
                'users_phone' => $faker->phoneNumber,
                'order_type' => $faker->randomElement(['standard', 'express', 'custom']),
                'order_name' => $faker->word,
                'category_id' => 1,
                'payment_status' => $faker->randomElement(['pending', 'successful', 'failed']),
                'order_date' => $faker->dateTimeBetween('2024-01-01', '2024-03-31'),
                'order_id' => $faker->uuid,
                'amount' => $faker->randomFloat(2, 10, 1000),
                'editors_id' => 1,
                'order_status' => $faker->randomElement(['pending', 'completed', 'cancelled', 'preview']),
                'file_uploaded_by_user' => $faker->optional()->fileExtension,
                'file_uploaded_by_admin_after_edit' => $faker->optional()->fileExtension,
                'styles_array' => json_encode([1,2]),
                'number_of_images_provided' => $faker->numberBetween(1, 100),
                'culling' => $faker->optional()->randomElement(['yes', 'no']),
                'images_culled_down_to' => $faker->optional()->numberBetween(1, 50),
                'select_image_culling_type' => $faker->optional()->word,
                'skin_retouching' => $faker->optional()->randomElement(['yes', 'no']),
                'skin_retouching_type' => $faker->optional()->word,
                'additional_info' => $faker->optional()->randomElement(['yes', 'no']),
                'preview_edits' => $faker->optional()->randomElement(['yes', 'no']),
                'user_id' => 6,
                'deleted_at' => null,
                'created_at' => $faker->dateTimeBetween('2024-01-01', '2024-03-31'),
                'updated_at' => $faker->dateTimeBetween('2024-01-01', '2024-03-31'),
            ]);
        }
    }
}
