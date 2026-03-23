<?php
$dsn = "pgsql:host=aws-1-ap-south-1.pooler.supabase.com;port=6543;dbname=postgres";
$pdo = new PDO($dsn, "postgres.cjfjhnvfdjosvtwcuxru", "ny5jMSbI955nSph9");
$stmt = $pdo->query("SELECT waba_id, access_token FROM whatsapp_configs ORDER BY created_at DESC LIMIT 1");
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$row) { die("No row found\n"); }

$url = "https://graph.facebook.com/v18.0/{$row['waba_id']}?fields=name&access_token={$row['access_token']}";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
echo "Result WABA Name: $response\n";

$url2 = "https://graph.facebook.com/v18.0/{$row['waba_id']}?fields=name,business&access_token={$row['access_token']}";
$ch2 = curl_init($url2);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
$response2 = curl_exec($ch2);
echo "Result WABA Business: $response2\n";
