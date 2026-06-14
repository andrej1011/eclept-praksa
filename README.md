# MovieMate Project

A full-stack cinema booking application. Browse movies and showtimes, book seats, manage bookings, and administer the catalog. Built with a **FastAPI + Postgres** backend and an **Angular 22** frontend.

Developed during an internship at [Eclept](https://www.eclept.com/).

## Features

- **Browse** movies with live search, genre/sort filters, and showtimes grouped by date
- **Book** seats for a showing, with sold-out and overbooking handling
- **Manage** your upcoming and past bookings (with cancel)
- **Profile** editing and password change
- **Admin panel**: full CRUD for genres, auditoriums, movies, showings (incl. bulk add), and users
- **Auth**: JWT login/register with role-based access (user / admin)
- **Theming**: persistent light / dark mode that follows system preference

## Architecture

```
┌─────────────────────────┐        HTTP / JSON        ┌───────────────────────────┐
│                         │  ───────────────────────► │      FastAPI backend      │
│   Angular 22 frontend   │  ◄─────────────────────── │     (SQLAlchemy, JWT)     │
│                         │       Bearer token        │                           │
└─────────────────────────┘                           └──────────────┬────────────┘
                                                                     │
                                                             ┌───────▼────────┐
                                                             │  PostgreSQL    │
                                                             └────────────────┘
```

## Tech Stack

**Frontend**
- [Angular 22](https://angular.dev/) - Frontend application framework
- TypeScript, SCSS

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — Web Famework
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM
- [Alembic](https://alembic.sqlalchemy.org/) - Database migrations
- [PostgreSQL](https://www.postgresql.org/) — Database	
- [Pydantic](https://docs.pydantic.dev/) — Validation
- JWT auth (PyJWT) + bcrypt password hashing (passlib)
- [Docker](https://www.docker.com/) — Containerized backend + DB


## Backend

REST API secured with JWT. Passwords are bcrypt-hashed; protected and admin-only routes are enforced server-side.

**Main endpoints**

| Area | Endpoints |
|------|-----------|
| Auth | `POST /login`, `POST /register` |
| Users | `GET /users/me`, `PATCH /users/me`, `PATCH /users/me/password`, `GET /users` (admin), `DELETE /users/{id}` (admin) |
| Movies | `GET /movies`, `GET /movies/{id}`, `POST/PATCH/DELETE` (admin) |
| Genres | `GET /genres`, `POST/PATCH/DELETE` (admin) |
| Auditoriums | `GET /auditoriums`, `POST/PATCH/DELETE` (admin) |
| Showings | `GET /showings`, `POST/PATCH/DELETE` (admin), `POST /showings/{id}/cancel` |
| Bookings | `POST /bookings`, `GET /bookings/me`, `POST /bookings/{id}/cancel` |

`GET /movies` supports filtering (name, genre, availability, duration, release date), sorting, and pagination.

### Run (Docker)

```bash
docker compose up --build
```

- API: http://localhost:8000
- Swagger API (built-in): http://localhost:8000/docs



## Frontend

Angular SPA consuming the API. JWT is stored client-side and attached via an HTTP interceptor; route guards protect authenticated and admin areas.

### Run

```bash
cd frontend
npm install
ng serve
```

- App: `http://localhost:4200`
- API base URL: `apiUrl: 'http://localhost:8000'`

**Routes**

| Route | Description |
|-------|-------------|
| `/` | Home — search and browse |
| `/movies`, `/movies/:id` | Movie list and detail |
| `/showings/:id/book` | Book seats (login required) |
| `/dashboard` | Your bookings (login required) |
| `/profile` | Profile and password (login required) |
| `/admin` | Admin panel (admin only) |
| `/login`, `/register` | Authentication |

## Database
PostgreSQL relational schema.

```
┌───────────────────────────────┐
│             users             │
├───────────────────────────────┤
│ PK │ id         : BIGINT      │
│    │ first_name : VARCHAR(255)│
│    │ last_name  : VARCHAR(255)│
│    │ email      : VARCHAR(255)│
│    │ password   : VARCHAR(255)│
│    │ created_at : TIMESTAMP   │
│    │ updated_at : TIMESTAMP   │
└───────────────┬───────────────┘
                │
                │ 1
                │
                │    ┌───────────────────────────────┐
                │    │           bookings            │
                │    ├───────────────────────────────┤
                │    │ PK │ id         : BIGINT      │
                └───►│ FK │ user_id    : BIGINT      │
                     │ FK │ showing_id : BIGINT      │
                     │    │ created_at : TIMESTAMP   │
                     │    │ updated_at : TIMESTAMP   │
                     └───────────────┬───────────────┘
                                     │
                                     │ M
                                     │
                                     │ 1
┌───────────────────────────────┐    │
│           showings            │    │
├───────────────────────────────┤    │
│ PK │ id            : BIGINT   │◄───┘
│ FK │ movie_id      │ BIGINT   │
│ FK │ auditorium_id │ BIGINT   │
│    │ start_time    │ TIMESTAMP│
│    │ end_time      │ TIMESTAMP│
└───────┬───────────────┬───────┘
        │               │
        │ M             │ M
        │               │
        │ 1             │ 1
┌───────▼───────┐       │    ┌───────────────────────────────┐
│    movies     │       │    │         auditoriums           │
├───────────────┤       │    ├───────────────────────────────┤
│ PK │ id       │       │    │ PK │ id         : BIGINT      │
│    │ title    │       └───►│    │ name       : VARCHAR(255)│
│    │ duration │            │    │ total_seats: INT         │
└───────▲───────┘            └───────────────────────────────┘
        │
        │ 1
        │
        │ M
┌───────┴───────┐            ┌───────────────────────────────┐
│ movie_genres  │            │            genres             │
├───────────────┤            ├───────────────────────────────┤
│ FK │ movie_id │            │ PK │ id         : BIGINT      │
│ FK │ genre_id │◄───────────│    │ name       : VARCHAR(255)│
└───────────────┘           1└───────────────────────────────┘
```

## Project Structure

```
eclept-praksa/
├── app/                 # FastAPI backend
│   ├── api/routes/      # endpoints
│   ├── services/        # business logic
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── core/            # config, security
│   └── main.py
├── frontend/            # Angular frontend
│   └── src/app/
│       ├── core/        # models, services, guards, interceptors
│       ├── shared/      # reusable components
│       ├── features/    # home, movies, booking, dashboard, profile, auth, admin
│       └── layout/      # header, footer
└── docker-compose.yml
```

## Internship at Eclept

MovieMate was built as an internship project at **Eclept**. The backend was developed first as the foundation, then the Angular frontend was built on top of it.

Goals of the internship:

- Build a real, full-stack application from an existing API
- Practice modern Angular
- Work against a live backend: reading source, confirming contracts, and fixing backend bugs surfaced by the frontend
- Cover the full feature set: authentication, public browsing, booking flow, user dashboard, and a complete admin panel

© 2026 Copyright [Eclept](https://www.eclept.com/) & [Andrej Rajkov](https://andrej1011.github.io/)
