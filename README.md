# Añuri - Wine Mixing Company Website

A dynamic, interactive website for Añuri - a creative startup specializing in custom mocktails and cocktails for events.

## Features

- 🍷 **Wine-themed Animations** - Floating bubbles, pour effects, and liquid transitions using GSAP
- 🧮 **Interactive Calculators** - Calorie calculator and BMI calculator for health-conscious guests
- 🎨 **Glassmorphism Design** - Modern glass-effect UI with elegant wine color palette
- 🍹 **Mix Builder** - Interactive ingredient selector with visual mixing glass animation
- 💫 **Scroll-based Effects** - Wine glass fill animation that tracks page scroll
- 🎴 **Flip Cards** - 3D rotating fact cards with auto-flip feature
- 🖱️ **Custom Cursor** - Wine droplet cursor with splash effects on click
- 📱 **Fully Responsive** - Optimized for all device sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Language**: TypeScript

## Color Palette

- Primary: `#c9632b` (Warm copper/wine)
- Secondary: `#631b23` (Deep burgundy)
- Accent: `#2f2220` (Dark wine)
- Cream: `#c5b599` (Elegant cream)
- Dark: `#1a0a0d` (Deep wine black)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── health/           # Health calculators
│   ├── services/         # Services gallery
│   ├── ingredients/      # Mix builder
│   ├── contact/          # Contact form
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── CustomCursor.tsx  # Wine droplet cursor
│   ├── WineBubbles.tsx   # Floating bubbles background
│   ├── ScrollWineGlass.tsx # Scroll progress indicator
│   ├── LoadingScreen.tsx # Initial loading animation
│   ├── FlipCard.tsx      # 3D flip cards
│   ├── InteractiveBottle.tsx # Pouring bottle animation
│   └── MixOfTheWeek.tsx  # Featured drink section
\`\`\`

## Pages

1. **Home** - Hero section, Mix of the Week, Did You Know facts, Services preview
2. **About** - Company story, mission, vision, team
3. **Health** - Calorie calculator, BMI calculator, wellness tips
4. **Services** - Weddings, corporate events, parties, custom orders
5. **Mix Builder** - Interactive ingredient selection and mixing
6. **Contact** - Booking form with event details

## License

© 2024 Añuri. All rights reserved.
