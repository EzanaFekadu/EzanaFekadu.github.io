# Ezana Fekadu — Portfolio Website

A modern, high-performance portfolio website built with React and Vite. Features smooth scroll animations, intersection observer effects, responsive design, and an elegant dark theme with cyan accents.

## 🎯 Overview

This portfolio showcases a Computer Science student's technical skills, projects, leadership experience, and achievements. The site demonstrates modern web development practices with smooth animations, responsive design, and optimized performance.

### Key Highlights
- **6 Major Sections**: Home, About, Skills, Projects, Experience, and Contact
- **Smooth Animations**: Intersection observer-based reveal animations with staggered timing
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and phones
- **Dark Theme**: Elegant color scheme with cyan accent (#5cffe5)
- **Interactive Elements**: Hover effects, parallax tracking, and smooth scroll navigation
- **Performance Optimized**: Built with Vite for fast development and production builds

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite development server configuration
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── src/
    ├── main.jsx            # React entry point
    └── Portfolio.jsx       # Main portfolio component
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.0 or higher
- **npm** 7.0 or higher

### Installation

1. **Clone the repository** (if not already done):
```bash
git clone https://github.com/EzanaFekadu/Portfolio.git
cd Portfolio
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open in browser**:
Navigate to `http://localhost:3000`

The development server includes hot module reloading (HMR) for instant updates as you edit files.

## 📦 Available Scripts

### `npm run dev`
Starts the development server with Vite on `http://localhost:3000`. Includes hot module reloading for live editing.

```bash
npm run dev
```

### `npm run build`
Creates an optimized production build in the `dist/` directory.

```bash
npm run build
```

### `npm run preview`
Serves the production build locally for testing before deployment.

```bash
npm run preview
```

## 🎨 Features & Sections

### 1. **Navigation (Fixed Header)**
- Responsive navigation bar with smooth scroll behavior
- Desktop navigation with section links
- Mobile hamburger menu for small screens
- Blur effect and styling that appears on scroll

### 2. **Hero Section**
- Full-screen landing area with parallax mouse tracking
- Gradient animated name text
- Call-to-action buttons (View Projects, Get In Touch)
- Animated scroll indicator
- Background grid and animated orb

### 3. **About Section**
- Overview and background information
- Statistics display (GPA, team led, students impacted)
- Two-column layout on desktop

### 4. **Skills Section**
- Organized by categories (Languages, Frameworks & Libraries, Tools & Platforms, Specializations)
- 4-column grid layout on desktop
- Responsive grid on tablet and mobile

### 5. **Projects Section**
- Featured project cards with hover animations
- Project metadata (role, period, description)
- Technology tags for each project
- "Featured" badge for highlighted projects
- 2-column layout on desktop

### 6. **Experience & Leadership Section**
- Timeline-style layout for roles and positions
- Education callout with GPA
- Organization and period information
- Department/organization highlights

### 7. **Contact Section**
- Call-to-action heading
- Contact cards (Email, Phone, LinkedIn, GitHub)
- Hover effects and smooth transitions
- External link handling for social profiles

### 8. **Footer**
- Copyright information
- Location detail

## 🎯 Customization Guide

### Update Personal Information

**Edit file**: `src/Portfolio.jsx`

#### Content Arrays

**Projects** (around line 10):
```javascript
const projects = [
  {
    title: "Your Project Title",
    role: "Your Role",
    period: "Start – End",
    description: "Project description",
    tags: ["Tech1", "Tech2"],
    highlight: true,  // Set to true for featured projects
  },
];
```

**Experience** (around line 50):
```javascript
const experiences = [
  {
    title: "Your Title",
    org: "Organization Name",
    period: "Start – End",
    detail: "Description of your role and achievements",
  },
];
```

**Skills** (around line 80):
```javascript
const skillCategories = [
  {
    label: "Category Name",
    items: ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
  },
];
```

### Update Contact Information

Search for these values in the Contact section and replace:
- `efekadu@murraystate.edu` → Your email
- `(703) 861-8851` → Your phone
- `https://linkedin.com` → Your LinkedIn URL
- `https://github.com` → Your GitHub URL

### Styling & Colors

The primary accent color is **#5cffe5** (cyan). To change it:

**Find and replace** all instances of `#5cffe5` with your desired color.

Key color definitions:
- **Background**: `#0a0a0c` (dark charcoal)
- **Text Primary**: `#e0e0e0` (light gray)
- **Text Secondary**: `rgba(255,255,255,0.5)` (dimmed white)
- **Accent**: `#5cffe5` (cyan - primary highlight color)

### Update Fonts

The portfolio uses three Google Fonts (loaded from CDN):
- **Headings**: Instrument Serif
- **Body Text**: DM Sans
- **Labels/Monospace**: DM Mono

To change fonts, update the font-family declarations in `src/Portfolio.jsx`, or modify the `@import` URL for Google Fonts.

## 📱 Responsive Breakpoints

The portfolio is fully responsive with these breakpoints:

| Device | Width | Changes |
|--------|-------|---------|
| Desktop | 1200px+ | Full layout, up to 4-column grids |
| Tablet | 769px - 1199px | 2-column grids where applicable |
| Mobile | 480px - 768px | 1-column layout, hamburger menu |
| Small Mobile | < 480px | Adjusted font sizes, single column |

**Master Breakpoints in CSS**:
- `@media (max-width: 768px)` - Tablet/mobile
- `@media (max-width: 480px)` - Small mobile devices

## ⚡ Performance Optimization

- **Vite**: Ultra-fast build tool with instant HMR during development
- **React 18**: Latest React features and automatic batching
- **Code Splitting**: Automatic by Vite in production
- **Lazy Animations**: Intersection Observer API (no layout shift)
- **Image Optimization**: Consider using WebP for any images added

### Build Stats
- Production build typically < 200KB (gzipped)
- Fast TTI (Time to Interactive)
- Lighthouse scores: 95+ Performance

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)

1. Update `vite.config.js` (if repo not at user root):
```javascript
export default defineConfig({
  base: '/Portfolio/', // Match your repo name
  // ...
});
```

2. Build and push:
```bash
npm run build
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. Enable in GitHub Settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /(root)

**Live at**: `https://ezanafekadu.github.io/Portfolio`

### Option 2: Vercel (Recommended)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite and deploys automatically
4. Custom domain support available

### Option 3: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 4: Traditional Hosting

1. Build: `npm run build`
2. Upload `dist/` folder to any web host
3. Set up HTTPS (recommended)

## 🔧 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | Latest versions |
| Firefox | Latest versions |
| Safari | Latest versions |
| Mobile Browsers | Latest versions |

**Note**: The portfolio uses modern CSS features (backdrop-filter, CSS Grid, Flexbox) and requires a relatively recent browser.

## 📚 Technologies Used

| Tech | Purpose | Version |
|------|---------|---------|
| **React** | UI framework | 18.2.0 |
| **Vite** | Build tool & dev server | 4.4.0 |
| **JavaScript** | Programming | ES2020+ |
| **CSS3** | Styling | Latest |
| **Google Fonts** | Typography | CDN |

## 🧩 Key Components & Hooks

### Custom Hooks

**`useInView(threshold = 0.15)`**
- Detects when an element enters the viewport using Intersection Observer
- Returns `[ref, visible]` tuple
- Triggers animations on scroll

### Components

**`<Reveal>`**
- Wraps content with animated reveal effect
- Props: `children`, `delay` (in seconds), `className`
- Smooth translateY and opacity animation

**`<Nav>`**
- Fixed navigation bar with active section tracking
- Mobile menu toggle
- Blur effect on scroll

**`<ProjectCard>`**
- Reusable card for project listings
- Hover animations and featured badge
- Technology tags display

## 🐛 Troubleshooting

### Port 3000 Already in Use
Modify `vite.config.js`:
```javascript
server: {
  port: 3001, // Use different port
  open: true
}
```

### Fonts Not Loading
If offline or fonts fail to load, system fonts will be used as fallbacks. Check browser network tab for CDN errors.

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check that all style objects are valid

## 📝 License

Personal portfolio template. Use as reference for your own portfolio.

## 🔗 Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Google Fonts](https://fonts.google.com)

## ⭐ Quick Reference

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Create optimized build
npm run preview      # Preview production build

# Git
git add .
git commit -m "message"
git push origin main
```

## 🎉 Getting Started Checklist (If you want to clone this)

- [ ] Update projects array with your work
- [ ] Update experiences array with your roles
- [ ] Update skillCategories with your skills
- [ ] Update contact information (email, phone, LinkedIn, GitHub)
- [ ] Customize colors if desired
- [ ] Test on mobile devices
- [ ] Build production version: `npm run build`
- [ ] Deploy to hosting platform
- [ ] Share your portfolio!

---

**Created**: February 2026  
**Built using React & Vite**  
**Repository**: [EzanaFekadu/Portfolio](https://github.com/EzanaFekadu/Portfolio)