import { NextRequest, NextResponse } from "next/server";

// This is server-only: use service DNS in Docker and localhost for host development.
const BACKEND_URL = (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:8001").replace(/\/$/, "");

async function forward(request: NextRequest, path: string[]) {
  const url = `${BACKEND_URL}/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init: RequestInit = {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.text(),
  };

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    console.error(`Backend proxy connection failed for ${url}`, error);
    return NextResponse.json(
      {
        detail: `Could not connect to the backend at ${BACKEND_URL}. Start it with npm run dev or check BACKEND_INTERNAL_URL.`,
      },
      { status: 502 }
    );
  }
  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: response.status,
    headers: response.headers,
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return forward(request, path);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return forward(request, path);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return forward(request, path);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return forward(request, path);
}
