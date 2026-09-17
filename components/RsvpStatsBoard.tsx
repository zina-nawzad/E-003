"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { OUTFIT_OPTIONS } from "@/lib/guest/useRsvp";

interface RsvpStatsBoardProps {
  getPercentageForOutfit: (outfitId: string) => number;
}

export default function RsvpStatsBoard({
  getPercentageForOutfit,
}: RsvpStatsBoardProps) {
  const t = useTranslations();

  return (
    <div className="space-y-6 mt-4">
      <div className="grid grid-cols-2 gap-6">
        {OUTFIT_OPTIONS.map((opt) => {
          const percentage = getPercentageForOutfit(opt.id);
          return (
            <div
              key={opt.id}
              className="flex flex-col items-center text-center space-y-1"
            >
              <div className="flex items-center justify-center gap-2 w-full h-24 md:h-48">
                <div className="relative w-full h-full">
                  <Image
                    src={opt.combo}
                    alt="Bride Outfit"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-medium text-sm md:text-xl inline-flex items-center gap-1 dir-rtl">
                {t("ofVotes")} <span dir="ltr">{percentage}%</span>
              </span>
              <span className="text-xs md:text-sm">{t(opt.labelKey)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
