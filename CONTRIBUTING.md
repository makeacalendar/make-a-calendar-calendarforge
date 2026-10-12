# Contributing

Use Node.js 22 or newer. Install dependencies with pnpm install, run pnpm test and pnpm typecheck, then start the app with pnpm dev.

Keep date-only values as validated YYYY-MM-DD civil dates. Do not turn a calendar day into a local-time instant for date calculations. Add focused tests for every new calendar rule, state the convention used, and link to authoritative rule documentation where applicable.

Please open an issue before proposing large features. Never include real personal calendar data, credentials, or private API responses in issues or fixtures.
