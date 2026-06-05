# Apostrophe — Registration Form

A React modal registration form built with Vite and Tailwind CSS v4.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── hooks/
│   └── useRegistrationForm.js
└── components/
    ├── FormField.jsx
    └── FormModal.jsx
```

## Features

- Modal form with name, email, password, and confirm password fields
- Real-time inline validation on blur and on change (after first touch)
- Keyboard accessible — close with Escape, focus trap on open
- Responsive layout for mobile and desktop
