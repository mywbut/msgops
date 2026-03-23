<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Convert tags from text[]/array to jsonb for Laravel cast compatibility
        DB::statement('ALTER TABLE contacts ALTER COLUMN tags TYPE jsonb USING to_jsonb(tags)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE contacts ALTER COLUMN tags TYPE text[] USING NULL');
    }
};
