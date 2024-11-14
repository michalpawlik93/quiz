import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    `Log in server console. Request from IP: ${getIpFromProxy(request)}`
  );

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

function getIpFromProxy(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0] : "IP not found";
}
