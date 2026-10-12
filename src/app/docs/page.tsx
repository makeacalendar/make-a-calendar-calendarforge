export default function Docs() {
  return (
    <main className="docs">
      <a href="/">← CalendarForge</a> · <a href="/resources">Calendar resources</a>
      <span className="eyebrow">DEVELOPER DOCUMENTATION</span>
      <h1>CalendarForge API</h1>
      <p>
        Version 0.1.0 · Calendar dates use ISO <code>YYYY-MM-DD</code> civil-date strings;
        they are not timestamps and are never shifted by local time zones.
      </p>
      <p>
        <a href="/api/openapi">Open the machine-readable OpenAPI 3.1 schema</a> ·{" "}
        <a href="/api/v1/health">Check service health</a>
      </p>

      <h2>Public date endpoints</h2>
      <ul>
        <li><code>GET /api/v1/health</code> — runtime and database-configuration status.</li>
        <li><code>GET /api/v1/calendar?year=2026&amp;month=10&amp;weekStartsOn=monday</code> — month grid, ISO weeks and observed federal holidays.</li>
        <li><code>GET /api/v1/business-days?start=2026-10-01&amp;end=2026-10-31</code> — inclusive weekday count, excluding weekends and observed federal holidays.</li>
        <li><code>GET /api/v1/business-days?start=2026-10-01&amp;amount=10</code> — add or subtract signed business days.</li>
        <li><code>GET /api/v1/fiscal/445?year=2026</code> — retail 4-4-5 period boundaries.</li>
        <li><code>GET /api/v1/exports/ics?year=2026</code> — downloadable observed US federal holiday calendar.</li>
      </ul>

      <h2>PostgreSQL project endpoints</h2>
      <p>
        These routes require <code>Authorization: Bearer YOUR_CALENDARFORGE_API_TOKEN</code>.
        Configure <code>DATABASE_URL</code> and a long, unique <code>CALENDARFORGE_API_TOKEN</code>.
        The table <code>calendar_projects</code> is initialized on the first authorized request.
        Projects are private to that shared token; this is a single-operator API, not multi-user
        authentication or workspace isolation.
      </p>
      <ul>
        <li><code>GET /api/v1/projects</code> — list up to 100 projects, newest updates first.</li>
        <li><code>POST /api/v1/projects</code> — create a project with a name and year; settings and events are optional JSON.</li>
        <li><code>{"GET /api/v1/projects/{id}"}</code> — read one project.</li>
        <li><code>{"PATCH /api/v1/projects/{id}"}</code> — update its name, year, settings, or events.</li>
        <li><code>{"DELETE /api/v1/projects/{id}"}</code> — delete one project.</li>
      </ul>
      <p>
        The request body for project creation includes a name (1–120 characters) and a year (1–9998);
        settings and event objects are optional. Send the bearer token over HTTPS and never expose
        it in browser code.
      </p>

      <h2>Demo data and privacy</h2>
      <p>
        Events entered in this public browser demo are saved in that browser&apos;s local storage.
        They do not use the PostgreSQL project API and are not shared with other visitors. Do not
        enter private calendar data into the public demo. For a persistent project API, deploy
        your own instance and protect its bearer token.
      </p>

      <h2>Calendar references</h2>
      <p>
        CalendarForge is independently implemented and does not call Make a Calendar private
        services. Complementary resources from the maker of Make a Calendar: browse{" "}
        <a href="https://make-a-calendar.com/monthly-calendars">printable monthly calendars</a>,{" "}
        <a href="https://make-a-calendar.com/business-days-calculator">business-day calculations</a>,{" "}
        <a href="https://make-a-calendar.com/445-calendar">4-4-5 fiscal calendars</a>, and the{" "}
        <a href="https://make-a-calendar.com/ical-generator">online iCalendar generator</a>.
      </p>
    </main>
  );
}
