"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

import locationImage from "@/public/assets/locationImage.svg";
import { Button } from "./ui/button";
import EventHeader from "./EventHeader";

interface LocationProps {
  mapUrl?: string;
  className?: string;
}

const Location = ({
  mapUrl = "https://maps.google.com/?q=Sami+Abdulrahman+Park",
  className = "",
}: LocationProps) => {
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
      className={`relative w-full max-w-2xl md:max-w-4xl mx-auto px-4 overflow-hidden ${className}`}
    >
      <EventHeader titleKey={"theVenue"} subtitleKey={"samiAbdulRahmanPark"} />

      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="mt-6 md:mt-10 relative"
      >
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full overflow-hidden">
            <Image
              src={locationImage}
              alt="Sami Abdulrahman Park"
              className="w-full h-auto object-contain block transition-transform duration-500 ease-out"
              priority
            />
          </div>

          <Button className="absolute bottom-0 inset-x-0 w-full z-40 bg-primary/90  text-white text-lg sm:text-xl md:text-2xl py-3 md:py-6 rounded-none transition-colors duration-300">
            {t("openInMaps")}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Location;
