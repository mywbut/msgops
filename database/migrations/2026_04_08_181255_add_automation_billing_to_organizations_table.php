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
        Schema::table('organizations', function (Blueprint $table) {
            $table->integer('monthly_automation_triggers')->default(0);
            $table->timestamp('automation_triggers_last_reset')->nullable();
            $table->timestamp('last_limit_warning_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->dropColumn(['monthly_automation_triggers', 'automation_triggers_last_reset', 'last_limit_warning_at']);
        });
    }
};
