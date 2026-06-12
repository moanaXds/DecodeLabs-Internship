# DecodeLabs Internship Program Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-supported-orange.svg)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-custom_properties-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JS ES6](https://img.shields.io/badge/JS-ES6_Vanilla-green.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, highly polished, and fully responsive landing page for the **DecodeLabs Internship Program**. Built with pure vanilla technologies (HTML5, Custom Properties CSS3, and JavaScript ES6) utilizing modern frontend practices, rich styling tokens, and accessible controls.

---

## Key Features

- **🌓 System-Aware Dark Mode**: Includes a theme toggler that swaps between a warm Mocha Mousse light theme and a sleek dark theme. Preserves theme settings using `localStorage` and automatically defaults to the user's system preferences (`prefers-color-scheme`).
- **📱 Responsive Layout & Bento Grids**: Utilizes CSS Grid and Flexbox to deliver a seamless mobile-first layout. Employs a Bento-style grid for the Program Experience and a 4-column layout for the Technical Foundation.
- **♿ Standard Accessibility (A11y)**:
  - Synchronized programmatic states (`aria-invalid="true"`) matching visual `:user-invalid` validation timings.
  - Linked fields utilizing both `aria-describedby` (linking instructions + errors) and `aria-errormessage` attributes.
  - Keyboard-focusable inputs, scrollable code blocks (`tabindex="0"`), and keyboard dismissible overlays (`Esc` modal close).
- **⚡ Custom Form Validation**: Employs the HTML5 Constraint Validation API, providing interaction-based validation warnings to prevent preemptive visual errors on initial page load.
- **✨ Micro-Animations**: Interactive hover scales on grid cards, smooth background transitions during theme switching, and smooth dialog fades using `backdrop-filter`.

---

## 🛠️ Tech Stack

- **Structure**: Semantic HTML5 (landmarks like `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, and interactive `<dialog>`).
- **Styling**: Vanilla CSS3 Custom Property design system tokens (spacing scale, curated color schemes, fluid font scales, and container limits).
- **Logic**: Vanilla JavaScript ES6 (DOM events, Intersection Observer Scroll Spy, LocalStorage cache, and validation timing).

---

## 📁 Repository Structure

```
├── .gitignore          # Ignores local OS, IDE configs, and build outputs
├── LICENSE             # Open-source MIT License terms
├── README.md           # Project documentation and details
├── index.html          # Main landing page document
├── style.css           # Curated CSS custom properties & layout definitions
├── script.js           # Navigation, Scroll Spy, theme, and validation handlers
└── design/
    └── mockup.html     # Raw design mockup templates
```

---

## 🚀 Getting Started

### Local Setup
Since this project is built entirely on native web standards, you can run it locally without installing any external package managers:

1. Clone or download the repository to your local computer.
2. Direct execution: Double-click `index.html` to open it in your browser of choice.
3. Server-based execution (Recommended for full asset resolutions):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```
4. Access the server in your browser at `http://localhost:8000` (or `http://localhost:3000`).

---

## 📄 License

This repository is distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it for educational or production purposes.
