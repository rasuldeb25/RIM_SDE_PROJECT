# Frontend Guide

This document explains the structure and development guidelines for the Vision Care Clinic frontend application.

## Overview

The frontend is a Single Page Application (SPA) built with:
- **React 18**: Component-based UI library.
- **Vite**: Next-generation build tool.
- **Tailwind CSS**: Utility-first CSS framework.
- **i18next**: Internationalization framework.

## Project Structure

```text
frontend/
├── src/
│   ├── api/              # API service functions (Axios/fetch wrappers)
│   ├── components/       # UI Components
│   │   ├── common/       # Global components (Header, Footer)
│   │   └── ui/           # Feature-specific components (Forms, Modals, Sliders)
│   ├── hooks/            # Custom React Hooks
│   ├── pages/            # Page components matched to Routes
│   ├── styles/           # Global CSS (Tailwind imports)
│   ├── i18n.js           # Internationalization configuration
│   ├── main.jsx          # Entry point
│   └── App.jsx           # Main App component with Routing
└── package.json          # Dependencies and scripts
```

## Key Components

### Pages (`src/pages/`)
- `LandingPage.jsx`: The homepage featuring the hero slider, services overview, and statistics.
- `DashboardPage.jsx`: User dashboard showing appointment history and profile management.
- `AppointmentBooking.jsx`: Form for users to book new appointments.
- Service Pages (`ComprehensivePage.jsx`, `LasikPage.jsx`, etc.): Static pages detailing specific treatments.

### UI Components (`src/components/ui/`)
- `HeroSlider.jsx`: Image slider for the landing page.
- `LoginModal.jsx` / `RegisterModal.jsx`: Modals for user authentication.
- `PatientProfileCard.jsx`: Displays user details on the dashboard.
- `AppointmentHistory.jsx`: Lists past and upcoming appointments.
- `EditProfileModal.jsx`: Form to update user profile and pet details.

## Routing

Routing is handled by `react-router-dom`. The main routes are defined in `App.jsx`.
- Public Routes: `/`, `/services/*`, `/about`, `/contact`
- Protected Routes: `/dashboard`, `/book-appointment` (Redirect to login if no token found).

## Internationalization (i18n)

The app supports multiple languages using `i18next`.
- Configuration is in `src/i18n.js`.
- Translations are typically loaded from `public/locales/{lang}/translation.json` (backend plugin) or defined inline if configured.
- Use the `useTranslation` hook in components:
  ```jsx
  const { t } = useTranslation();
  <h1>{t('welcome_message')}</h1>
  ```

## Styling

We use **Tailwind CSS**. 
- Utility classes are applied directly to elements (e.g., `className="text-xl font-bold p-4"`).
- Custom configurations can be added in `tailwind.config.js`.

## Adding a New Page

1. Create a new component in `src/pages/NewPage.jsx`.
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. (Optional) Add a link in the `Header` or `Footer`.

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```
