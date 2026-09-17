export type Locale = (typeof locales)[number];
export const locales = [ "ar", "ku"] as const;
export const defaultLocale: Locale = "ku";