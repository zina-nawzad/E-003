export type Locale = (typeof locales)[number];
export const locales = [ "en" ,"ar", "ku"] as const;
export const defaultLocale: Locale = "ku";