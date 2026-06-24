# Hexlet Chat

[![Actions Status](https://github.com/ilia-m-dev/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ilia-m-dev/frontend-project-12/actions)

Hexlet Chat is a real-time chat application built as part of the Hexlet Frontend curriculum. The app supports user authentication, channels, messages, channel management, toast notifications, profanity filtering, i18n, and Rollbar error tracking.

## Live Demo

[Open Hexlet Chat](https://frontend-project-12-vg4w.onrender.com)

## Tech Stack

- React
- Redux Toolkit
- React Router
- React Bootstrap
- Formik and Yup
- i18next
- Socket.IO
- React Toastify
- leo-profanity
- Rollbar
- Vite

## Requirements

- Node.js 18 or higher
- npm

## Installation

Install all dependencies from the repository root:

```bash
make install
```

## Build

Build the frontend application:

```bash
make build
```

## Run

Start the backend server. It also serves the built frontend from `frontend/dist`:

```bash
make start
```

The app will be available at:

```text
http://localhost:5001
```

## Environment Variables

Rollbar is optional for local development. To enable it, create `frontend/.env`:

```env
VITE_ROLLBAR_ACCESS_TOKEN=your_post_client_item_token
VITE_ROLLBAR_ENVIRONMENT=development
```
