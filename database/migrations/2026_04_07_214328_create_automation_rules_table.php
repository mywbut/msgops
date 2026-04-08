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
        Schema::create('automation_rules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('org_id');
            $table->string('name');
            $table->string('trigger_type')->default('message_received');
            $table->jsonb('trigger_config')->nullable(); // matching_method, keywords, threshold
            $table->jsonb('action_config')->nullable();  // array of actions {type: 'send_message', material_id: '...'}
            $table->boolean('is_active')->default(true);
            $table->integer('executed_count')->default(0);
            $table->timestamp('last_executed_at')->nullable();
            $table->timestamps();

            $table->foreign('org_id')->references('id')->on('organizations')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('automation_rules');
    }
};
