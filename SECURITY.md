# Security

Report suspected vulnerabilities privately to the repository owner through GitHub's security advisory feature. Do not publish tokens, real calendars, or database dumps in an issue.

The public demo stores its sample edits in browser local storage. Do not enter private calendar data there. Persistent project API routes require Authorization: Bearer CALENDARFORGE_API_TOKEN; use a long random token and TLS. The current shared-token model is intended for a single trusted operator and is not multi-user authentication or workspace isolation.
