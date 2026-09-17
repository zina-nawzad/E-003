"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const Language = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const languages = [
    { label: "Ar", value: "ar" },
    { label: "Ku", value: "ku" },
  ];

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="relative inline-flex items-center p-1 mb-6 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20 shadow-inner">
      {languages.map((lang) => {
        const isActive = currentLocale === lang.value;

        return (
          <button
            key={lang.value}
            onClick={() => switchLanguage(lang.value)}
            className={`
              relative z-10 px-4 py-1.5 text-sm md:text-base font-medium rounded-full transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              ${
                isActive
                  ? "text-background bg-primary font-semibold"
                  : "text-primary"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeLanguagePill"
                className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default Language;
