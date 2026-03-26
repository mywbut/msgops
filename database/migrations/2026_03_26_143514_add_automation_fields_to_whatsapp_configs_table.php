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
            $table->boolean('is_automation_enabled')->default(false);
            $table->text('automation_keywords')->nullable();
            $table->text('automation_reply')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('whatsapp_configs', function (Blueprint $table) {
            $table->dropColumn(['is_automation_enabled', 'automation_keywords', 'automation_reply']);
        });
    }
};
