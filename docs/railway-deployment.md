# Railway deployment

Deploy the repository as a Docker service. The app listens on Railway's injected PORT, and /api/v1/health is the rollout health check.

For persistent project CRUD, add Railway PostgreSQL and set the web service's DATABASE_URL to the database's private connection reference. Set CALENDARFORGE_API_TOKEN to a long generated secret. Project endpoints return 401 without this token. Tables are created lazily on the first authorized request; db/migrations/0001_projects.sql is the reviewed schema reference.

The public calendar demo uses browser local storage and does not read or write PostgreSQL. The database-backed API is a shared-token, single-operator interface, not a multi-user account system. No worker is required in this release. PostgreSQL and an always-on public web process can consume hosting credits; check current Railway usage and shut down resources you do not need.
