import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: [ "en", "ar", "ku"],
  defaultLocale: "ku",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};