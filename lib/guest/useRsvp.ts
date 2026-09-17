import { useState, useEffect } from "react";
import { useWishes, useConfirmedStats } from "./read";
import { submitRsvpWish } from "./write";

import menGray from "@/public/assets/menGray.svg";
import menBlack from "@/public/assets/menBlack.svg";
import menBrown from "@/public/assets/menBrown.svg";
import menBeje from "@/public/assets/menOffwhite.svg";
import womanBlue from "@/public/assets/womanBlue.svg";
import womanGreen from "@/public/assets/womanGreen.svg";
import womanPink from "@/public/assets/womanPink.svg";
import womanWhite from "@/public/assets/womanWhite.svg";

import whiteAndBrown from "@/public/assets/Brown-White.svg";
import pinkAndGray from "@/public/assets/Gray-Pink.svg";
import blueAndBeje from "@/public/assets/Offwhite-Blue.svg";
import greenAndBlack from "@/public/assets/Black-Green.svg";

export const OUTFIT_OPTIONS = [
  {
    id: "white_brown",
    woman: womanWhite,
    man: menBrown,
    combo: whiteAndBrown,
    labelKey: "whiteAndBrown",
  },
  {
    id: "pink_gray",
    woman: womanPink,
    man: menGray,
    combo: pinkAndGray,
    labelKey: "pinkAndGray",
  },
  {
    id: "blue_beige",
    woman: womanBlue,
    man: menBeje,
    combo: blueAndBeje,
    labelKey: "blueAndBeige",
  },
  {
    id: "green_black",
    woman: womanGreen,
    man: menBlack,
    combo: greenAndBlack,
    labelKey: "greenAndBlack",
  },
];

export function useRsvpLogic(eventId?: string) {
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { wishes, loading } = useWishes(eventId);
  const { confirmedCount } = useConfirmedStats(eventId);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getPercentageForOutfit = (outfitId: string) => {
    if (!wishes || wishes.length === 0) return 0;
    const votes = wishes.filter(
      (w) => w.selectedOutfit === outfitId
    ).length;
    return Math.round((votes / wishes.length) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !attendance) return;

    setIsSubmitting(true);
    try {
      await submitRsvpWish({
        id: eventId,
        fullName,
        attendance,
        guestCount,
        selectedOutfit,
        message,
      });

      setFullName("");
      setMessage("");
      setAttendance(null);
      setGuestCount(1);
      setSelectedOutfit(null);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state: {
      fullName,
      attendance,
      guestCount,
      selectedOutfit,
      message,
      isSubmitting,
      hasMounted,
      wishes,
      loading,
      confirmedCount,
    },
    actions: {
      setFullName,
      setAttendance,
      setGuestCount,
      setSelectedOutfit,
      setMessage,
      handleSubmit,
      getPercentageForOutfit,
    },
  };
}