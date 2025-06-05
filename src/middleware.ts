import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/verify") ||
//       url.pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.redirect(new URL("/home", request.url));
// }

// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
// };

export default auth(async req => {
  const token = await getToken({ req: req });
  // console.log(token);
  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
