import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(request) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account"],
};
