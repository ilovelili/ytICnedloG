# Change Log

## 2025-10-21

### Added memo CRUD API
- Introduced an in-memory note store at `contracts/services/noteStore.js` with create/read/update/delete helpers and reset support.
- Implemented `contracts/controllers/noteController.js` to validate payloads and expose REST handlers.
- Registered new Express routes via `contracts/routes/noteRoute.js` and mounted them under `/notes` and `/api/notes` in `contracts/app.js`.

### Testing
- Added `contracts/tests/noteStore.test.js` with assertion-based coverage for the in-memory store.

### Documentation
- Updated `README.md` with memo API details, endpoint table, and curl quick start snippet.

### Tooling
- Revised npm scripts in `package.json` to separate server and client startup, and to run standard React build/test/eject commands.

### Maintenance
- Hardened `contracts/utils/sendEmail.js` to skip SendGrid configuration when the API key is missing or invalid.

### DevOps
- Added `Dockerfile.backend`, `Dockerfile.frontend`, and `docker-compose.yml` to run the Express API and React frontend via containers.
- Updated `README.md` with Docker Compose usage instructions.
- Added npm helper scripts (`docker:up`, `docker:down`, `docker:logs`) for common Compose tasks.
- Adjusted `Dockerfile.backend` to copy only required backend assets after removing the non-existent `utils` directory from the build context.
