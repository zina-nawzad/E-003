"use client";

import { useMemo, useEffect } from "react";
import Image from "next/image";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

import countdownImage from "@/public/assets/countdown.svg";
import EventHeader from "../EventHeader";

interface CountdownCardProps {
  targetDate?: string | Date | number;
  title?: string;
  dateLabel?: string;
  className?: string;
}

interface CountdownDisplayProps extends CountdownRenderProps {
  t: ReturnType<typeof useTranslations>;
}

const CountdownDisplay = ({
  days,
  hours,
  minutes,
  completed,
  t,
}: CountdownDisplayProps) => {
  if (completed) {
    return (
      <span
        data-aos="fade-in"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary"
      >
        {t("eventStarted")}
      </span>
    );
  }

  const formatNum = (num: number) => String(num).padStart(2, "0");

  const timerItems = [
    { value: minutes, label: t("minutes") },
    { value: hours, label: t("hours") },
    { value: days, label: t("days") },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 w-full max-w-xl md:max-w-3xl mt-6 mx-auto">
      {timerItems.map((item, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          data-aos-delay={index * 150}
          className="relative aspect-4/4 w-full flex flex-col items-center justify-center overflow-hidden rounded-xs transition-transform duration-300"
        >
          <Image
            src={countdownImage}
            alt="Box Background"
            fill
            className="object-cover z-0"
            priority
          />

          <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none text-secondary mb-1 md:mb-3">
              {formatNum(item.value)}
            </span>
            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-secondary tracking-wide">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

CountdownDisplay.displayName = "CountdownDisplay";

export const CountdownCard = ({
  targetDate = "",
  title,
  dateLabel,
  className = "",
}: CountdownCardProps) => {
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const dateObj = useMemo(() => {
    return typeof targetDate === "string" || typeof targetDate === "number"
      ? new Date(targetDate)
      : targetDate;
  }, [targetDate]);

  const displayTitle = title;
  const displaySubtitle = dateLabel;

  return (
    <div
      className={`w-full max-w-2xl md:max-w-4xl mx-auto px-4 text-center ${className}`}
    >
      <EventHeader titleKey={displayTitle} subtitleKey={displaySubtitle} />

      <div data-aos="fade-up" data-aos-delay="200" className="mt-6 md:mt-10">
        <Countdown
          date={dateObj}
          renderer={(props) => <CountdownDisplay {...props} t={t} />}
        />
      </div>
    </div>
  );
};

CountdownCard.displayName = "CountdownCard";

export default CountdownCard;
