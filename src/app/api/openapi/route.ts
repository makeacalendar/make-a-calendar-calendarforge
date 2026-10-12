const errorResponse = { description: "Request failed" };
const bearer = [{ bearerAuth: [] }];
const projectId = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

export async function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "CalendarForge API",
      version: "0.1.0",
      description:
        "Civil-date calendar and scheduling endpoints, with optional bearer-protected PostgreSQL project storage.",
    },
    servers: [{ url: "/api/v1" }],
    paths: {
      "/health": {
        get: {
          summary: "Service health and configuration status",
          responses: { "200": { description: "Service status" } },
        },
      },
      "/calendar": {
        get: {
          summary: "Month grid and observed US federal holidays",
          parameters: [
            { name: "year", in: "query", required: true, schema: { type: "integer", minimum: 1, maximum: 9998 } },
            { name: "month", in: "query", required: true, schema: { type: "integer", minimum: 1, maximum: 12 } },
            { name: "weekStartsOn", in: "query", schema: { type: "string", enum: ["monday", "sunday"] } },
          ],
          responses: { "200": { description: "Civil-date month grid" }, "400": errorResponse },
        },
      },
      "/business-days": {
        get: {
          summary: "Count or add business days",
          parameters: [
            { name: "start", in: "query", required: true, schema: { type: "string", format: "date" } },
            { name: "end", in: "query", schema: { type: "string", format: "date" } },
            { name: "amount", in: "query", schema: { type: "integer" } },
          ],
          responses: { "200": { description: "Business-day calculation" }, "400": errorResponse },
        },
      },
      "/fiscal/445": {
        get: {
          summary: "Retail 4-4-5 period boundaries",
          parameters: [{ name: "year", in: "query", required: true, schema: { type: "integer" } }],
          responses: { "200": { description: "Retail period boundaries" }, "400": errorResponse },
        },
      },
      "/exports/ics": {
        get: {
          summary: "Download observed US federal holidays as an iCalendar file",
          parameters: [{ name: "year", in: "query", schema: { type: "integer" } }],
          responses: { "200": { description: "text/calendar" }, "400": errorResponse },
        },
      },
      "/projects": {
        get: {
          summary: "List persisted calendar projects",
          security: bearer,
          responses: {
            "200": { description: "Up to 100 projects, newest updates first" },
            "401": { description: "Bearer token required" },
            "503": { description: "Database unavailable" },
          },
        },
        post: {
          summary: "Create a persisted calendar project",
          security: bearer,
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "year"],
                  properties: {
                    name: { type: "string", minLength: 1, maxLength: 120 },
                    year: { type: "integer", minimum: 1, maximum: 9998 },
                    settings: { type: "object", additionalProperties: true },
                    events: { type: "array", items: { type: "object", additionalProperties: true } },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Project created" },
            "400": errorResponse,
            "401": { description: "Bearer token required" },
          },
        },
      },
      "/projects/{id}": {
        parameters: [projectId],
        get: {
          summary: "Read one persisted project",
          security: bearer,
          responses: {
            "200": { description: "Project" },
            "401": { description: "Bearer token required" },
            "404": { description: "Project not found" },
          },
        },
        patch: {
          summary: "Update a persisted project",
          security: bearer,
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", minLength: 1, maxLength: 120 },
                    year: { type: "integer", minimum: 1, maximum: 9998 },
                    settings: { type: "object", additionalProperties: true },
                    events: { type: "array", items: { type: "object", additionalProperties: true } },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Project updated" },
            "400": errorResponse,
            "401": { description: "Bearer token required" },
            "404": { description: "Project not found" },
          },
        },
        delete: {
          summary: "Delete a persisted project",
          security: bearer,
          responses: {
            "204": { description: "Project deleted" },
            "401": { description: "Bearer token required" },
            "404": { description: "Project not found" },
          },
        },
      },
    },
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer" } },
    },
  });
}
