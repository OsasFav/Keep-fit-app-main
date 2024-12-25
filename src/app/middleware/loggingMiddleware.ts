import { NextRequest } from 'next/server';

export function loggingMiddleware(request: NextRequest) {
  // Log the request details
  const logResponse = {
    method: request.method,
    url: request.url,
    headers: request.headers,
  };

  // console.log("Logging Request: ", logResponse);
  return { response: logResponse };
}
