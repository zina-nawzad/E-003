"use client";

import { useEffect } from "react";
import { Great_Vibes } from "next/font/google";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import Language from "./Language";

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
});

const Introduction = () => {
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-16 px-4 lg:max-w-4xl lg:mx-auto">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 md:top-6">
        <Language />
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-1" />

      <div
        data-aos="fade-up"
        className="relative z-10 flex flex-col items-center justify-center text-center w-full p-8 text-primary space-y-10 md:space-y-16"
      >
        <p
          data-aos="fade-down"
          data-aos-delay="200"
          className="text-xl md:text-5xl font-bold text-primary leading-relaxed"
        >
          {t("twoHeartsOneLove")}
        </p>

        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="w-16 md:w-24 h-px bg-primary opacity-60"
        />

        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className={`${greatVibes.className} space-y-6 md:space-y-12 text-secondary`}
        >
          <h1 className="text-4xl md:text-6xl tracking-wide">Rozhin Diyar</h1>
          <span className="text-3xl md:text-5xl block font-serif">&</span>
          <h1 className="text-4xl md:text-6xl tracking-wide">Saman Sherko</h1>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          className="w-16 md:w-24 h-px bg-primary opacity-60"
        />

        <div className="space-y-6 md:space-y-10">
          <p
            data-aos="fade-up"
            data-aos-delay="600"
            className="text-xl md:text-5xl text-primary tracking-widest font-semibold"
          >
            {t("dateNumerals")}
          </p>

          <p
            data-aos="fade-up"
            data-aos-delay="700"
            className="text-xl md:text-5xl text-primary"
          >
            {t("dayOfWeek")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
