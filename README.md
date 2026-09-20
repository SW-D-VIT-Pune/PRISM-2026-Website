# PRISM '26 — Official Website

Official web application for **PRISM '26**, the annual flagship social-impact platform organized by the **Social Welfare & Development Committee (SWDC)** at **Vishwakarma Institute of Technology (VIT), Pune**.

---

## 📌 Overview

PRISM '26 brings together student changemakers, youth leaders, NGOs, educators, and community partners to engineer real-world welfare solutions.

The platform is structured around the core **P.R.I.S.M.** framework:
- **P** — **Public** (*Civic & Community Engagement*)
- **R** — **Reform** (*Policy & Social Transformation*)
- **I** — **Innovation** (*Human-Centered Solutions*)
- **S** — **Sustainability** (*Long-Term Ecological Impact*)
- **M** — **Management** (*Organized Social Execution*)

---

## 🚀 Key Features & Sections

- **Hero & Glimpses Showcase**: Interactive photo carousel highlighting flashback moments from PRISM '25 with edge-to-edge full image visibility.
- **Programme Lineup & Key Events**: Multi-track showcase across Day 1 & Day 2 featuring:
  1. **NSS Events** (*The Youth Floor & Tenure Presentations*) — with direct redirection to the NSS Unit Events tab.
  2. **NGO Talks** (*Grassroots Field Realities & Impact Stories*)
  3. **Open Mind** (*Open-Floor Thought Exchange*)
  4. **Kala-Kriti** (*Cultural Showcase & Expressions*)
  5. **Sociothon & Ideathon** (*₹67,000 Cash Prize Social Hackathon*)
  6. **TED-x Talks** (*Curated Practitioner Sessions*)
  7. **Vishwa Akhyan** (*Marathi Heritage & Valedictory Showcase*)
- **NSS & Social Units Hub**: Unit delegation guidelines, *The Sevasrujan Award* overview, and unit registration portal.
- **Institutional Stewardship**: Highlights of **VIT Pune** (NAAC Grade 'A++', Est. 1983 under Bansilal Ramnath Agrawal Charitable Trust) and the **SWD Committee**.
- **Partner NGOs & Speakers**: Showcasing collaborations with NAAM Foundation, Teach for India, Vanarai, 1M1B, and distinguished keynote speakers.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Icons**: Lucide React
- **Design System**: Handcrafted Editorial Design System using CSS tokens (`tokens.css`) and clean component styles (`components.css`).

---

## 💻 Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SW-D-VIT-Pune/PRISM-2026-Website.git
   cd PRISM-2026-Website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## 📁 Repository Structure

```
PRISM-2026-Website/
├── public/
│   └── images/                 # Event photos, logos & assets
├── src/
│   ├── components/             # React components
│   │   ├── AboutSection.jsx    # Institutional Stewardship & P.R.I.S.M. Framework
│   │   ├── ContactPage.jsx     # Contact Us & SWD Team details
│   │   ├── EventTracks.jsx     # Competition track highlights
│   │   ├── Footer.jsx          # Site footer & navigation
│   │   ├── GuestsSection.jsx   # Keynote speakers & dignitaries
│   │   ├── Hero.jsx            # Banner & Glimpses photo carousel
│   │   ├── HighlightCTA.jsx    # Call to action & registration banners
│   │   ├── KeyEventsSection.jsx # Programme lineup & timeline
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── NGOsSection.jsx     # Partner NGOs & non-profits
│   │   ├── NSSPage.jsx         # NSS Unit Hub & Sevasrujan Award
│   │   ├── RegistrationPage.jsx # Registration guidelines & fee structures
│   │   └── TimelineSection.jsx  # Event timeline & milestones
│   ├── styles/
│   │   ├── tokens.css          # Color palette & typographic tokens
│   │   └── components.css      # Shared utility & component styling
│   ├── App.jsx                 # Main application controller
│   └── main.jsx                # Application entry point
├── package.json
└── README.md
```

---

## 🌐 Official Links

- **Vishwakarma Institute of Technology (VIT Pune)**: [https://www.vit.edu/](https://www.vit.edu/)
- **Social Welfare & Development Committee (SWD)**: [https://swd.vit.edu/](https://swd.vit.edu/)

---

*Organized by Social Welfare & Development Committee, VIT Pune.*
