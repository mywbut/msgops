<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('whatsapp_configs', function (Blueprint $table) {
            $table->string('business_name')->nullable();
            $table->string('business_id')->nullable();
            $table->string('waba_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('phone_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('whatsapp_configs', function (Blueprint $table) {
            $table->dropColumn([
                'business_name',
                'business_id',
                'waba_name',
                'phone_number',
                'phone_status',
            ]);
        });
    }
};
