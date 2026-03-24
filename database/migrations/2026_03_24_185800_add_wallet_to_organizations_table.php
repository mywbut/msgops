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
        Schema::table('organizations', function (Blueprint $col) {
            $col->decimal('wallet_balance', 15, 2)->default(0.00)->after('plan');
            $col->string('currency', 3)->default('INR')->after('wallet_balance');
            $col->integer('free_service_conversations')->default(1000)->after('currency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $col) {
            $col->dropColumn(['wallet_balance', 'currency', 'free_service_conversations']);
        });
    }
};
