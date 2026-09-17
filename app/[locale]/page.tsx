"use client";
import { useState } from "react";

import IntroVideo from "@/components/IntroVideo";
import Introduction from "@/components/Introduction";
import { useTranslations } from "next-intl";
import CountdownCard from "@/components/ui/Countdown";
import Location from "@/components/Location";
import Details from "@/components/Details";
import Clothes from "@/components/Clothes";
import Rsvp from "@/components/Rsvp";

const Page = () => {
  const t = useTranslations();
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  return (
    <main className="min-h-screen space-y-32 relative">
      {!isVideoFinished ? (
        <IntroVideo onComplete={() => setIsVideoFinished(true)} />
      ) : (
        <>
          <Introduction />
          <CountdownCard
            targetDate="2026-09-24T18:00:00"
            title={"countdown"}
            dateLabel={"dateLabel"}
          />
          <Location />
          <Details />
          <Clothes />
          <Rsvp />{" "}
        </>
      )}
    </main>
  );
};

export default Page;
