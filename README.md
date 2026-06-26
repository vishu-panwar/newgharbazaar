# GharBazaar — Premium Real Estate Platform

MERN stack real estate platform with a premium glassmorphism header.

## Project Structure

```
gharbazaar-client/   → React + Vite frontend
gharbazaar-server/   → Express.js backend API
```

## Quick Start

### Frontend
```bash
cd gharbazaar-client
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd gharbazaar-server
npm run dev
# → http://localhost:5000
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/health | Health check |
| GET | /api/properties | List properties (filter: ?type=Buy&city=Pune) |
| GET | /api/properties/:id | Single property |
