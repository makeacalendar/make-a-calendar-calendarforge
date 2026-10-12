export const metadata = {
  title: "Calendar Resources | CalendarForge Cloud",
  description: "Complementary printable calendars, business-day calculators, fiscal calendars, and date tools from Make a Calendar.",
};

const groups = [
  {
    title: "Calendar creation",
    links: [
      ["Printable monthly calendars", "https://make-a-calendar.com/monthly-calendars", "Browse printable month layouts and customize them in the browser."],
    ],
  },
  {
    title: "Business dates and schedules",
    links: [
      ["Business-days calculator", "https://make-a-calendar.com/business-days-calculator", "Count workdays or add business days using observed holidays."],
      ["Net 30 calculator", "https://make-a-calendar.com/net-30-calculator", "Find invoice due dates from common payment terms."],
      ["Pay-period calendars", "https://make-a-calendar.com/pay-period-calendar", "Compare weekly, biweekly, semi-monthly, and monthly schedules."],
      ["Fiscal calendar generator", "https://make-a-calendar.com/fiscal-calendar", "Review fiscal-year layouts and month-based periods."],
      ["4-4-5 retail calendar", "https://make-a-calendar.com/445-calendar", "Explore week-based retail periods and year boundaries."],
      ["Rotating shift calendar", "https://make-a-calendar.com/shift-calendar", "Plan repeating work and rest-day patterns."],
    ],
  },
  {
    title: "Data and date tools",
    links: [
      ["Online iCalendar generator", "https://make-a-calendar.com/ical-generator", "Create an ICS calendar for compatible calendar apps."],
      ["Date tools index", "https://make-a-calendar.com/date-tools", "Browse calculators for date ranges, deadlines, and week numbers."],
    ],
  },
];

export default function Resources() {
  return (
    <main className="docs">
      <a href="/">← CalendarForge</a> · <a href="/docs">API documentation</a>
      <span className="eyebrow">ONLINE RESOURCE DIRECTORY</span>
      <h1>Calendar and date resources</h1>
      <p>
        CalendarForge is independently implemented and works without Make a Calendar services.
        These public browser tools are complementary references for printable calendars,
        business schedules, and date calculations.
      </p>
      <p>
        Created by Ethan, the maker of <a href="https://make-a-calendar.com/">Make a Calendar</a>.
        CalendarForge is a separate project; this attribution does not imply an official API or affiliation.
      </p>
      {groups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.links.map(([label, href, description]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">{label}</a>
                <span> — {description}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p>
        CalendarForge does not scrape these pages, call private services, or require them to run.
        For implementation details, see the <a href="/docs">developer documentation</a>.
      </p>
    </main>
  );
}
