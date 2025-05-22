# Mini Twitter Clone

A simple Twitter-like application built with Vue 3 + TypeScript (frontend) and Bun + Hono + Drizzle ORM (backend).

## Features

- Create tweets with a 280-character limit
- View all tweets in a feed
- Real-time character counter
- Mobile-responsive design
- Input validation
- Error handling

## Prerequisites

- Node.js (v16 or higher)
- Bun (v1.0 or higher)

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

The backend server will run on http://localhost:3000

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on http://localhost:5173

## API Endpoints

- `POST /api/tweet` - Create a new tweet
  ```json
  {
    "author": "string",
    "content": "string (max 280 characters)"
  }
  ```

- `GET /api/tweets` - Get all tweets (newest first)

## Technologies Used

- Frontend:
  - Vue 3
  - TypeScript
  - Tailwind CSS
  - Axios

- Backend:
  - Bun
  - Hono
  - Drizzle ORM
  - SQLite
  - Zod (validation) 