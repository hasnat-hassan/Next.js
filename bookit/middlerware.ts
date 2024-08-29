import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  console.log("middleware is runing");
});

export const config = {
  matcher: ["/me/:path*"],
};
