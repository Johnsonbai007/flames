# FLAMES – Discover Your Love Connection ❤️

A modern, romantic, viral, and interactive web application built with **React**, **Vite**, **Tailwind CSS**, and prepared with **Supabase** cloud database sync.

Calculate your true relationship destiny based on the authentic, traditional paper-and-pen **FLAMES** algorithm!

---

## ✨ Features

- **Authentic Traditional FLAMES Algorithm**:
  - Exact letter-by-letter matching and strikethrough.
  - Accurate unshared letter counting.
  - Authentic circular elimination starting from the letter following each eliminated character.
  - Special handling for soulmates (100% letter resonance).
- **Interactive Step-by-Step Breakdown**:
  - Expandable calculator drawer showing letter strikeout details for both names.
  - Round-by-round elimination visualizer revealing exactly how the final letter was decided.
- **Premium Romantic UI / UX**:
  - Pink, purple, and red multi-stop animated celestial gradient background.
  - 60 FPS lightweight canvas particles with floating glowing hearts and twinkling sparkles.
  - Frosted glassmorphism cards with smooth glow borders and soft shadows.
  - Custom Google Fonts (`Outfit` & `Playfair Display`) for editorial elegance.
  - Micro-interactions, animated heart sweep buttons, and sample couple quick-picks.
  - Romantic confetti heart explosions on reveal.
  - Multi-stage romantic calculation suspense loader.
- **Dedicated Themes for All 6 Outcomes**:
  - **F – Friends** 🤝 (*Golden amber glow, unbreakable bond*)
  - **L – Love** 💖 (*Passionate crimson ruby, soulmate romance*)
  - **A – Affection** 🥰 (*Tender fuchsia rose, warm caring sanctuary*)
  - **M – Marriage** 💍 (*Eternal gold and champagne, sacred lifelong union*)
  - **E – Enemies** ⚡ (*Electric violet-rose tension, spicy frenemies-to-lovers*)
  - **S – Siblings** 🧸 (*Sunny teal-cyan camaraderie, protective family kinship*)
- **Sound Effects (Web Audio API)**:
  - Gentle romantic synthesized chimes and celestial sparkle tones.
  - No external MP3 dependencies—100% reliable and instantaneous.
  - One-click mute/unmute control in navigation.
- **Sharing & Exporting**:
  - Native Web Share API integration (mobile & supported browsers).
  - Elegant fallback modal with direct WhatsApp and X (Twitter) sharing.
  - One-click formatted clipboard copy with love poem & stats.
- **Supabase Integration & Offline Resilience**:
  - Connects to Supabase with official `@supabase/supabase-js`.
  - Transparent dual-storage model: Saves to Supabase when configured, and always keeps a local browser history backup.
  - Works 100% seamlessly offline or without Supabase credentials.
  - Transparent status reporting: Never pretends database operations succeeded when they failed.
  - Built-in connection tester and diagnostic modal.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### 1. Installation

```bash
# Clone or navigate to the repository
cd flames

# Install dependencies
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Run the Algorithm Verification Tests

```bash
npm test
```

Verifies the mathematical correctness of:
- All 6 FLAMES outcomes (`F`, `L`, `A`, `M`, `E`, `S`)
- Letter cancellation and remaining counts
- Normalization (spaces, hyphens, case-insensitivity)
- Empty input validation
- Special identical names soulmate case

### 4. Build for Production

```bash
npm run build
```

---

## 🗄️ Supabase Setup Instructions

The application is completely ready to connect to your Supabase project.

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in or create an account.
2. Click **New Project** and name it (e.g., `flames-love-calculator`).

### Step 2: Run the SQL Schema
1. In your Supabase Dashboard, open the **SQL Editor** from the left sidebar.
2. Open the file [`supabase/schema.sql`](./supabase/schema.sql) in this repository.
3. Paste the SQL into the editor and click **Run**.

This will create:
- The `flames_results` table:
  - `id` (UUID, Primary Key, auto-generated)
  - `your_name` (Text, NOT NULL)
  - `partner_name` (Text, NOT NULL)
  - `flames_result` (Text, NOT NULL)
  - `created_at` (Timestamp with time zone, default `now()`)
- An index on `created_at DESC` for fast history retrieval.
- Row Level Security (RLS) policies allowing public anonymous inserts and selects while protecting against unauthorized modifications.

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. In your Supabase Dashboard, go to **Project Settings** -> **API**.
3. Copy your **Project URL** and **Project API Key (`anon` / `public`)**.
4. Paste them into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart your Vite development server (`npm run dev`).

### Step 4: Verify the Connection
- Click the **Database Status** button in the top navigation bar or footer.
- Click **"Test Connection"** to verify that your Supabase database is reachable and accepting calculations.

> **Note**: If you don't configure Supabase, the app will continue to run with full functionality using browser `localStorage`!

---

## 📂 Project Architecture

```
flames/
├── .env.example              # Environment variable template
├── index.html                # App shell, SEO meta tags, Google Fonts
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
├── supabase/
│   └── schema.sql            # Supabase database schema & RLS policies
├── public/
│   └── favicon.svg           # Custom glowing heart flame favicon
└── src/
    ├── components/
    │   ├── BackgroundHearts.tsx     # 60fps floating canvas hearts & sparkles
    │   ├── CalculationBreakdown.tsx # Traditional strikethrough & elimination visualizer
    │   ├── FlameLoader.tsx          # Multi-phase cosmic calculation suspense loader
    │   ├── HeroSection.tsx          # Main input cards, swap, validation, & couple chips
    │   ├── Navbar.tsx               # Header, logo, sound toggle, & database status
    │   ├── RecentCalculations.tsx   # History drawer with search & clear options
    │   ├── ResultCard.tsx           # Romantic reveal card with outcome themes & stats
    │   ├── ShareModal.tsx           # Social share & message copy dialog
    │   └── SupabaseModal.tsx        # Database status diagnostic & setup helper
    ├── context/
    │   ├── AudioContext.tsx         # Synthesized romantic audio with Web Audio API
    │   └── ToastContext.tsx         # Global romantic toast notification system
    ├── lib/
    │   └── supabase.ts              # Supabase client wrapper & safe query helpers
    ├── utils/
    │   ├── flamesAlgorithm.ts       # Authentic traditional FLAMES algorithm logic
    │   ├── flamesData.ts            # Detailed themes, quotes, stats & descriptions
    │   ├── flames.test.ts           # Comprehensive automated unit test suite
    │   └── storage.ts               # LocalStorage backup manager for history
    ├── App.tsx                      # Main application orchestrator
    ├── index.css                    # Tailwind CSS v4 & custom glassmorphism styles
    ├── main.tsx                     # React root mount
    └── vite-env.d.ts                # TypeScript Vite declarations
```

---

## 📜 The Traditional FLAMES Algorithm

FLAMES is a classic schoolyard and college game used to determine the relationship destiny between two names:

1. **Letter Cancellation**:
   Remove common letters between both names. For each matching letter, one occurrence is struck off from both names.
2. **Remaining Count**:
   Count the total number of letters remaining across both names.
3. **Circular Elimination**:
   Starting with the letters `F`, `L`, `A`, `M`, `E`, `S`:
   - Count up to the remaining count starting from the first letter (wrapping around cyclically).
   - Eliminate the landed letter.
   - For the next round, start counting from the position immediately following the eliminated letter.
   - Repeat until only one letter remains!
4. **The 6 Outcomes**:
   - **F** = Friends
   - **L** = Love
   - **A** = Affection
   - **M** = Marriage
   - **E** = Enemies
   - **S** = Siblings

---

## 🛡️ License

MIT License. Crafted with love ❤️.
