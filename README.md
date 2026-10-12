# CalendarForge Cloud

**Self-hosted calendar infrastructure for scheduling, business planning, date intelligence, and automated exports.**

CalendarForge Cloud is an independent, open-source calendar planning studio and API. It combines a date-only Gregorian engine, business-day calculations, retail 4-4-5 periods, a browser calendar workspace, exports, and token-protected PostgreSQL project endpoints.

Created by Ethan, the maker of [Make a Calendar](https://make-a-calendar.com/). CalendarForge does not call Make a Calendar private services and works independently. The linked site offers complementary printable calendars and online date tools.

## What works in v0.1.0

- Gregorian month grids with Sunday or Monday starts, ISO week numbers and a six-row option in the library.
- Leap-year, civil-date validation, month lengths, ISO week-year, US federal observed dates, inclusive weekday counting, and business-day addition/subtraction.
- 4-4-5 retail periods using the Sunday nearest February 1 convention, including a 53rd week when the boundary span requires it.
- Responsive calendar studio with browser-local demo events, holiday overlays, and JSON, CSV, ICS, and print actions.
- REST API for calendar grids, business days, retail periods, ICS federal-holiday export, health, and PostgreSQL-backed project CRUD.
- OpenAPI document at /api/openapi, Docker build, Railway health check, and GitHub CI workflow.

The public demo's calendar events are saved in browser local storage. The PostgreSQL API uses a shared bearer token for a single trusted operator; it is not multi-user authentication or workspace isolation. No background worker is included. See the current limits in docs/railway-deployment.md.

## Preview

Run locally to see the authentic application:

    pnpm install
    pnpm dev

Visit http://localhost:3000. The demo can be explored without credentials.

## API

| Endpoint | Purpose |
| --- | --- |
| GET /api/v1/health | Runtime status |
| GET /api/v1/calendar?year=2026&month=10&weekStartsOn=monday | Civil-date month grid and holidays |
| GET /api/v1/business-days?start=2026-10-01&end=2026-10-31 | Inclusive workday count |
| GET /api/v1/business-days?start=2026-10-01&amount=10 | Add business days |
| GET /api/v1/fiscal/445?year=2026 | Retail period boundaries |
| GET /api/v1/exports/ics?year=2026 | Holiday ICS download |
| GET, POST /api/v1/projects | List or create persisted projects (bearer token required) |
| GET, PATCH, DELETE /api/v1/projects/{id} | Read, update or delete a persisted project (bearer token required) |
| GET /api/openapi | OpenAPI 3.1 JSON |

    curl 'http://localhost:3000/api/v1/calendar?year=2026&month=10'
    curl 'http://localhost:3000/api/v1/business-days?start=2026-10-01&amount=10'

## PostgreSQL project API

Set DATABASE_URL and a strong CALENDARFORGE_API_TOKEN. The API creates its table on the first authorized call; the reviewed schema is in db/migrations/0001_projects.sql.

    curl -X POST http://localhost:3000/api/v1/projects \
      -H "Authorization: Bearer $CALENDARFORGE_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"name":"Operations 2026","year":2026,"events":[{"date":"2026-11-02","title":"Planning review"}]}'

Projects are private to the shared bearer credential. Treat the token like an administrator password and only send it over TLS. Do not expose it in browser code.

## Calendar conventions and exports

Civil dates remain YYYY-MM-DD; they are not timestamps and avoid local timezone shifts. Business-day counts include both endpoints, exclude weekends and the U.S. federal observed holiday set by default. Retail periods follow the documented Sunday-nearest-February-1 anchor. That convention may differ from an employer's fiscal policy.

The UI downloads ICS event and federal holiday entries, CSV month grids, JSON month data, and browser print output. ICS fields escape commas, semicolons, newlines, and backslashes. PDF export is not implemented in this release.

## Railway

The repository includes a Dockerfile and Railway health-check configuration. Add PostgreSQL and map DATABASE_URL to the database's private connection string. Set CALENDARFORGE_API_TOKEN using a generated secret. The web UI remains usable without PostgreSQL; persistent project endpoints require both variables.

Deployments can consume credits for the app and PostgreSQL. Costs depend on resource size and runtime; see Railway's [current template guidance](https://docs.railway.com/templates/best-practices) and [PostgreSQL documentation](https://docs.railway.com/databases/postgresql). The database is private by default; prefer private service networking. No fixed monthly price is promised.

## Local development

Requirements: Node.js 22 or newer and PostgreSQL only for project CRUD.

    cp .env.example .env
    pnpm install
    pnpm dev
    pnpm test
    pnpm typecheck
    pnpm build

## Documentation

- [Calendar mathematics](docs/calendar-mathematics.md)
- [Railway deployment and limits](docs/railway-deployment.md)
- [Complementary online calendar resources](docs/online-resources.md)
- [Security policy](SECURITY.md)

## Online calendar resources

These links complement CalendarForge and are independent browser-based tools:

- Plan a printable [monthly calendar](https://make-a-calendar.com/monthly-calendars).
- Check [business days](https://make-a-calendar.com/business-days-calculator) and observed holidays.
- Compare [pay-period calendars](https://make-a-calendar.com/pay-period-calendar).
- Review [4-4-5 retail periods](https://make-a-calendar.com/445-calendar).
- Create an online [iCalendar file](https://make-a-calendar.com/ical-generator).
- Browse [date and scheduling tools](https://make-a-calendar.com/date-tools).

## License and attribution

MIT. Created by Ethan, the maker of [Make a Calendar](https://make-a-calendar.com/). CalendarForge is a separate project; this attribution does not imply an official website API or any third-party affiliation.
