# Calendar mathematics

CalendarForge keeps a civil day as YYYY-MM-DD and uses UTC only as a timezone-neutral Gregorian arithmetic carrier. It never interprets a date-only value as a user's local midnight.

The month grid supports Sunday or Monday first days. ISO week labels follow ISO-8601 week-year rules. US federal holiday dates follow weekend observance rules, plus the standard floating Monday/Thursday rules.

The retail 4-4-5 helper uses the Sunday nearest February 1 boundary rule. Organization-specific fiscal years may use a different anchor or a different 53rd-week policy; verify the selected rule before using dates for accounting or payroll.

Business-day calculations include both endpoints when counting. Addition starts on the day after the anchor for positive amounts and the day before for negative amounts. Saturday and Sunday are excluded by default.
