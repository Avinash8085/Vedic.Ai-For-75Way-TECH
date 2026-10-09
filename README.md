# Vedic.AI

Vedic.AI is a production-oriented AI diet planning platform for dietitians and patients.
## Deployment Link - https://luminous-kataifi-b983fa.netlify.app/

## Tech Stack

- Frontend: Next.js (App Router), TypeScript, TailwindCSS, React Query, Zustand, Recharts
- Backend: FastAPI, SQLAlchemy, PostgreSQL, Redis, JWT auth
- AI: OpenAI API with deterministic fallback planner
- Infra: Docker, docker-compose, environment-based config

## Core Features

- Role-based authentication (`dietitian`, `patient`) with JWT
- Dietitian dashboard:
  - Create patient profiles
  - View patient history
  - Generate/regenerate AI diet plans
  - Add patient progress logs
  - Export plan as PDF
- Patient dashboard:
  - View daily meal cards and macros
  - Track weight progress chart
  - Weekly meal planner
  - Grocery list generation
  - Dark mode

## Project Structure

```text
.
|-- app/                          # Next.js frontend
|   |-- api/backend/[...path]/    # Proxy API layer to FastAPI
|   |-- dashboard/dietitian/      # Dietitian dashboard UI
|   |-- dashboard/patient/        # Patient dashboard UI
|   |-- lib/                      # API client, state, types
|-- backend/
|   |-- app/
|   |   |-- api/routes/           # FastAPI endpoints
|   |   |-- core/                 # Settings and security
|   |   |-- database/             # SQLAlchemy setup
|   |   |-- models/               # ORM models
|   |   |-- schemas/              # Pydantic schemas
|   |   |-- services/             # AI and cache services
|   |-- main.py                   # FastAPI entrypoint
|-- docker-compose.yml
```

## API Endpoints

- Auth
  - `POST /auth/signup`
  - `POST /auth/login`
- Patients
  - `POST /patients`
  - `GET /patients`
  - `GET /patients/{id}`
- Diet plans
  - `POST /diet/generate`
  - `GET /diet/{patient_id}`
  - `GET /diet/{patient_id}/weekly`
  - `GET /diet/{patient_id}/grocery-list`
- Progress
  - `POST /progress`
  - `GET /progress/{patient_id}`
- Export
  - `GET /export/diet/{patient_id}/pdf`

## Local Setup

### Local development

Install frontend dependencies and Python backend dependencies once, then copy
the local environment templates and run both apps with one command:

```bash
npm install
cp .env.local.example .env.local
cp backend/.env.example backend/.env
python3 -m pip install -r backend/requirements.txt
npm run dev
```

`npm run dev` starts PostgreSQL and Redis with Docker Compose, then runs the
FastAPI backend on `127.0.0.1:8001` and Next.js on `localhost:3000`. Docker must
be running. Configure `GEMINI_API_KEY` in `backend/.env` to enable chat.

`BACKEND_INTERNAL_URL` is the server-side proxy target. The local template uses
`http://127.0.0.1:8001`; Docker Compose overrides it with
`http://backend:8000`. It should not use a `NEXT_PUBLIC_` prefix.

### Docker deployment

```bash
docker compose up --build
```

The Next.js API proxy is available at `/api/backend/*` and forwards requests to
FastAPI using `BACKEND_INTERNAL_URL`.

### Netlify deployment

Netlify uses the Next.js App Router adapter automatically. The checked-in
`netlify.toml` runs `npm run build` and publishes `.next`; no SPA redirect or
static export is configured, so App Router pages and route handlers keep their
Next.js behavior. Deploy FastAPI separately and set `BACKEND_INTERNAL_URL` in
Netlify to its public HTTPS origin (for example, `https://api.example.com`).
Set `GEMINI_API_KEY`, database, and Redis settings on the Python backend host;
do not expose those secrets through `NEXT_PUBLIC_*` variables.

## Notes

- If `OPENAI_API_KEY` is missing, the backend uses a deterministic nutrition fallback planner.
- SQLAlchemy tables are auto-created on backend startup for rapid development.
- For production hardening, add Alembic migrations, HTTPS termination, secret management, and structured logging.
