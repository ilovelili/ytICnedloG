#### GoldenCity is a modern real estate investment platform that combines traditional property investing with cryptocurrency payments. Built with React and Tailwind CSS, it mirrors the functionality of Arrived.com while adding blockchain-based transaction capabilities.

## Key Features

- Cryptocurrency-enabled property transactions
- Mobile-responsive design
- SEO-optimized architecture
- Real-time market data integration
- Interactive 3D property visualization
- Smart contract integration for secure transactions

## Technical Overview

The platform is built using:

- React for component-based architecture
- Tailwind CSS for responsive styling
- React Router for client-side routing
- Three.js for 3D property visualizations
- Web3.js for blockchain interactions

## Backend Memo CRUD API

A lightweight Express API powers the memo feature used in the backend developer test. The endpoints operate on an in-memory data store (no database setup required) and are mounted on both `/notes` and `/api/notes` for convenience.

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/notes`        | Create a new note     |
| GET    | `/notes`        | Retrieve all notes    |
| GET    | `/notes/:id`    | Retrieve a note by ID |
| PUT    | `/notes/:id`    | Update a note by ID   |
| DELETE | `/notes/:id`    | Delete a note by ID   |

### Quick Start

1. Install dependencies with `npm install`.
2. Start the project with `npm start` (runs the React app and Express server together).
3. Interact with the API using your preferred REST client:

```bash
curl -X POST http://localhost:3099/notes \
	-H "Content-Type: application/json" \
	-d '{"title":"First note","content":"Remember to hydrate."}'
```

## Docker Compose

A `docker-compose.yml` is provided to launch the backend API and the built frontend in coordinated containers.

1. Build and start the stack:

```bash
docker compose up --build
```

2. Access the services:
	 - Backend API: http://localhost:3099/notes
	 - Frontend (served via Nginx): http://localhost:3000

3. Stop the stack when finished:

```bash
docker compose down
```



## Acknowledgments

Special thanks to the Arrived.com team for inspiration and the React/Tailwind CSS communities for their continued support and resources.
