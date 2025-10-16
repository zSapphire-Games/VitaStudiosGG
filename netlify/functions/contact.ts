import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// In-memory storage for contact submissions (for demo purposes)
// In production, you'd want to use a database or external service
const contactSubmissions: Array<{
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}> = [];

let nextId = 1;

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  // Handle GET requests - retrieve all contact submissions
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactSubmissions),
    };
  }

  // Handle POST requests - create new contact submission
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      
      // Basic validation
      if (!body.name || !body.email || !body.message) {
        return {
          statusCode: 400,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Missing required fields" }),
        };
      }

      // Create new submission
      const submission = {
        id: nextId++,
        name: body.name,
        email: body.email,
        message: body.message,
        createdAt: new Date().toISOString(),
      };

      contactSubmissions.push(submission);

      return {
        statusCode: 201,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
