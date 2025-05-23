# Twitter Clone App

A simple Twitter-like application built with Vue 3, TypeScript, Express, and Drizzle ORM.

## Features

- Create tweets (max 280 characters)
- View all tweets in chronological order
- Real-time character counter
- Mobile-responsive design
- Error handling and loading states

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Drizzle ORM
- **Database**: SQLite

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend server will run on http://localhost:3000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173 (or the port shown in your terminal)

Also enter the folder backend and run the command
bun run ./src/db/migrate.ts

## API Endpoints

- `POST /api/tweet` - Create a new tweet
  ```json
  {
    "author": "Your Name",
    "content": "Your tweet content"
  }
  ```
- `GET /api/tweets` - Get all tweets (newest first)

## Project Structure

```
/
├── backend/          # Backend code
│   └── src/
│       ├── db/      # Database configuration
│       ├── validations/  # Input validation
│       └── index.ts # Main server file
└── frontend/        # Frontend code
    └── src/
        ├── App.vue  # Main component
        └── main.ts  # Entry point
```

## Error Handling

The application includes error handling for:
- Invalid tweet content (empty or > 280 characters)
- Network errors
- Server errors

## Contributing

Feel free to submit issues and enhancement requests! 
