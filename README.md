# Nazar Matviyiv - Resume

[![CI](https://github.com/matviyiv/matviyiv.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/matviyiv/matviyiv.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/matviyiv/matviyiv.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/matviyiv/matviyiv.github.io/actions/workflows/deploy.yml)
[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)

> Modern, hi-tech resume website built with React, featuring a dark theme with AI-inspired design elements.

## 🌐 Live Site

Visit the live site at: [https://matviyiv.github.io](https://matviyiv.github.io)

## ✨ Features

- **Modern Dark Theme**: Hi-tech design with gradient effects and glass-morphism
- **Responsive Design**: Works seamlessly on all devices
- **Animated Components**: Smooth scroll animations and interactive elements
- **SEO Optimized**: Meta tags and structured data for better discoverability
- **Tested & Validated**: 20 unit tests with pre-commit/pre-push hooks
- **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/matviyiv/matviyiv.github.io.git
cd matviyiv.github.io

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📜 Available Scripts

### `npm start`

Runs the app in development mode. The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode. All tests must pass before commits.

### `npm run build`

Builds the app for production to the `build` folder with optimized performance.

### `npm run deploy`

Builds and deploys the app to GitHub Pages (manual deployment).

## 🧪 Testing

The project includes comprehensive test coverage:

- **20 unit tests** covering components and user interactions
- **Pre-commit hook**: Runs tests before each commit
- **Pre-push hook**: Runs tests and build before each push
- **CI Pipeline**: Tests run on Node.js 18.x and 20.x

```bash
# Run tests once
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage
```

## 🎨 Design

Modern dark theme with:
- Glass-morphism cards with backdrop blur
- Animated gradient backgrounds
- Neon glow effects
- Interactive hover states
- Custom animations (gradient, float, glow)

## 🛠️ Tech Stack

- **React 19.1** - UI framework
- **Tailwind CSS 3.4** - Styling
- **FontAwesome** - Icons
- **React Helmet** - SEO meta tags
- **Jest + Testing Library** - Testing
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Header with animated gradients
│   ├── Experience.js   # Work experience section
│   ├── Skills.js       # Skills with interactive tags
│   ├── Education.js    # Education section
│   └── ...
├── App.js              # Main application
├── index.css           # Global styles and theme
└── setupTests.js       # Test configuration
```

## 🔒 Security

- Deployment restricted to `main`/`master` branch only
- Multi-layer branch verification in CI/CD
- Pre-commit/pre-push hooks prevent bad code
- All external links use `noopener noreferrer`

## 📝 License

This project is open source and available under the MIT License.

## 🇺🇦 Support Ukraine

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://stand-with-ukraine.pp.ua)

---

Built with ❤️ by [Nazar Matviyiv](https://github.com/matviyiv)
