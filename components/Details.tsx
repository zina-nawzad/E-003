"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import star from "@/public/assets/start.svg";
import sweet from "@/public/assets/sweet.svg";
import photo from "@/public/assets/photo.svg";
import car from "@/public/assets/car.svg";
import item from "@/public/assets/item.svg";
import EventHeader from "./EventHeader";

const timelineData = [
  {
    id: "welcome",
    time: "starTime",
    titleKey: "welcomeTitle",
    descKey: "welcomeDesc",
    image: star,
    align: "left",
  },
  {
    id: "sweets",
    time: "sweetTime",
    titleKey: "sweetsTitle",
    descKey: "sweetsDesc",
    image: sweet,
    align: "right",
  },
  {
    id: "photos",
    time: "photoTime",
    titleKey: "photosTitle",
    descKey: "photosDesc",
    image: photo,
    align: "left",
  },
  {
    id: "departure",
    time: "departureTime",
    titleKey: "departureTitle",
    descKey: "departureDesc",
    image: car,
    align: "right",
  },
];

const Details = () => {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 flex flex-col items-center">
      <EventHeader
        titleKey={"eventPlanTitle"}
        subtitleKey={"eventPlanSubtitle"}
      />

      <div className="relative w-full flex flex-col items-center">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-primary rounded-full" />

        <motion.div
          animate={{
            top: `${(activeIndex / (timelineData.length - 1)) * 85 + 7}%`,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-28 md:h-28 pointer-events-none"
        >
          <Image
            src={item}
            alt="Timeline Marker"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <div className="w-full space-y-2 py-8">
          {timelineData.map((node, index) => {
            const isLeft = node.align === "left";

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.6, once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center w-full ${
                  isLeft ? "justify-start text-right" : "justify-end text-left"
                }`}
              >
                <div
                  className={`w-[45%] flex flex-col items-center  text-center space-y-6 ${
                    isLeft ? "pr-2" : "pl-2"
                  }`}
                >
                  <div className="relative w-28 h-28 md:w-52 md:h-52 ">
                    <Image
                      src={node.image}
                      alt={node.id}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span className="text-xl md:text-4xl text-primary">
                    {t(node.time)}
                  </span>

                  <h3 className="text-lg md:text-4xl font-bold text-secondary">
                    {t(node.titleKey)}
                  </h3>

                  <p className="text-sm md:text-3xl text-primary leading-relaxed max-w-xs">
                    {t(node.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
