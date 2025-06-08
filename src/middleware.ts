import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(req => {
  if (!req.auth) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard"],
};
