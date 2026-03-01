# WhatsApp SaaS Task Checklist

## Phase 1: Database Setup (Supabase)
- [x] Design multi-tenant database schema
- [x] Create `organizations`, `whatsapp_configs` tables
- [x] Create additional required tables (contacts, messages, users)
- [x] Apply schema to Supabase

## Phase 2: Live Backend Refactor (Laravel)
- [x] Initialize Laravel project (msgops.in)
- [x] Connect Laravel to Supabase Database (PostgreSQL)
- [x] Create Webhook Controller & Routes
- [x] Refactor WhatsApp messaging logic into a Laravel Service

## Phase 2.5: Initial Live Deployment
- [x] Initialize Git repository
- [x] Clone on DigitalOcean `msgops.in` Droplet
- [x] Configure live `.env` and Nginx
- [x] Test real webhook payload hitting Supabase

## Phase 3: Frontend "Embedded Signup" (Laravel Blade / React)
- [x] Scaffold Embedded Signup UI in Laravel
- [x] Integrate Meta "Login with Facebook"
- [x] Save WhatsApp API Keys to Supabase Backends after handshake

## Phase 4: Meta Portal Configuration
- [ ] Setup OAuth & Tech Provider settings in Business Manager

## Phase 5: Core Minimum Viable SaaS
- [ ] Build Template Manager integration
- [ ] Build Broadcast Tool logic
- [ ] Automation logic (auto-replies)
- [ ] Chat inbox data sync
- [ ] Usage tracking for plan limits

## Phase 6 & 7: Billing and Advanced Features
- [ ] Razorpay integration
- [ ] Webhook for plan enforcement
- [ ] AI integration

## Phase 8: Public Landing Page & Legal Requirements
- [x] Create public routes for legal pages
- [x] Build professional Welcome/Landing page
- [x] Create Privacy Policy page
- [x] Create Terms of Service page
- [x] Create Data Deletion Instructions page
