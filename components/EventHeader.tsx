"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface EventHeaderProps {
  titleKey?: string;
  subtitleKey?: string;
}

export const EventHeader = ({
  titleKey = "eventPlanTitle",
  subtitleKey = "eventPlanSubtitle",
}: EventHeaderProps) => {
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div
      className={`text-center mb-4 z-10`}
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-primary mb-5">
        {t(titleKey)}
      </h2>
      <p className="text-lg md:text-4xl text-primary mb-8 font-medium">
        {t(subtitleKey)}
      </p>
    </div>
  );
};

export default EventHeader;
