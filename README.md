# Chessalyze

Chessalyze is a web application designed to replicate and enhance the Game Review feature from Chess.com, which is typically limited to free users once per day. With Chessalyze, users can enter any Chess.com username, fetch their games, and analyze them using the powerful Stockfish chess engine. Registered users can save their analyzed games to access them anytime.

## Features

- Fetch and display games by Chess.com username
- Analyze games using Stockfish's REST API for move evaluations and best moves
- Step through game positions with move-by-move analysis
- Toggle board orientation for better viewing experience
- Save analyzed games by creating an account for easy future access
- Responsive and user-friendly UI built with React and Next.js

## Technologies Used

- **Next.js** - React framework for server-side rendering and routing
- **React** - UI components and state management
- **Prisma** - ORM for database management
- **PostgreSQL** - Relational database to store user and game data
- [Stockfish REST API](https://stockfish.online/) — For chess engine analysis

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database setup

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/chessalyze.git
   cd chessalyze
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up your `.env` file with database and API keys

   ```bash
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_secret
   ```

4. Run Prisma migrations to set up the database schema

   ```bash
   npx prisma migrate deploy
   ```

5. Start the development server
   ```bash
   npm run dev
   ```
