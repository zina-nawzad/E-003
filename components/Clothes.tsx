"use client";

import EventHeader from "./EventHeader";
import clothesImage from "@/public/assets/clothesImage.svg";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Clothes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 flex flex-col items-center">
      <EventHeader titleKey={"clothesTitle"} subtitleKey={"clothesSubtitle"} />
      <Image
        src={clothesImage}
        alt="Dress Code"
        className="w-full h-auto object-contain"
        data-aos="fade-down"
        data-aos-duration="900"
        priority
      />
    </div>
  );
};

export default Clothes;
