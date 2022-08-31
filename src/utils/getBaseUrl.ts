export function getBaseUrl(roomId: string): string {
  let baseUrl = "";

  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  else if (process.env.RENDER_INTERNAL_HOSTNAME) {
    baseUrl = `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  else {
    baseUrl = `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return `${baseUrl}/submit-messages/${roomId}`;
}
