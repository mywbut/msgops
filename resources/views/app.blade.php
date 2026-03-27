<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="/favicon.png">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Open Graph / Social Media Meta Tags -->
        <meta property="og:title" content="Grow Your Business on WhatsApp with MsgOps">
        <meta property="og:description" content="Send bulk messages, automate follow-ups, and manage customers easily.">
        <meta property="og:image" content="https://msgops.in/preview.png">
        <meta property="og:url" content="https://msgops.in">
        <meta property="og:type" content="website">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
