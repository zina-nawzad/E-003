"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Carousel,
  CarouselContent,
  CarouselControlGroup,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import EventHeader from "./EventHeader";
import RsvpStatsBoard from "./RsvpStatsBoard";
import { useRsvpLogic, OUTFIT_OPTIONS } from "@/lib/guest/useRsvp";
import { GuestDoc } from "@/lib/guest/read";

interface InteractiveRsvpProps {
  id?: string;
}

export default function Rsvp({ id }: InteractiveRsvpProps) {
  const { state, actions } = useRsvpLogic(id);
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="w-full mx-auto space-y-12 text-center text-primary px-12">
      <form
        onSubmit={actions.handleSubmit}
        className="space-y-6 text-left bg-transparent py-6 px-4 md:py-8"
        data-aos="fade-up"
      >
        <EventHeader titleKey={"rsvpTitle"} subtitleKey={"rsvpSubtitle"} />

        <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
          <Input
            type="text"
            label={t("fullName")}
            placeholder={t("writeYourFullName")}
            value={state.fullName}
            onChange={(e) => actions.setFullName(e.target.value)}
            required
          />
        </div>

        <div
          className="grid grid-cols-2 gap-4 pt-4"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <button
            type="button"
            onClick={() => actions.setAttendance("yes")}
            className={`py-2 px-4 border rounded-sm text-sm md:text-2xl transition-all text-center cursor-pointer ${
              state.attendance === "yes"
                ? "border-primary text-primary font-bold"
                : "border-primary/30 text-primary/70"
            }`}
          >
            {t("yesIWillBeThere")}
          </button>
          <button
            type="button"
            onClick={() => {
              actions.setAttendance("no");
              actions.setGuestCount(0);
            }}
            className={`py-2 px-4 border rounded-sm text-sm md:text-2xl transition-all text-center cursor-pointer ${
              state.attendance === "no"
                ? "border-primary text-primary font-bold"
                : "border-primary/30 text-primary/70"
            }`}
          >
            {t("noCantMakeIt")}
          </button>
        </div>

        {state.attendance === "yes" && (
          <div data-aos="fade-down">
            <Input
              type="number"
              label={t("numberOfGuests")}
              placeholder={t("pleaseWriteNumberOfGuests")}
              value={state.guestCount}
              onChange={(e) =>
                actions.setGuestCount(Math.max(1, Number(e.target.value)))
              }
              min={1}
              required
            />
          </div>
        )}

        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          <label className="block text-end font-bold text-sm md:text-3xl text-primary mb-6 mt-8">
            {t("predictCoupleOutfitTitle")}
          </label>
          <div className="grid grid-cols-2 gap-4">
            {OUTFIT_OPTIONS.map((option, index) => {
              const isSelected = state.selectedOutfit === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => actions.setSelectedOutfit(option.id)}
                  className={`p-2 border rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-primary border-primary shadow-md"
                      : "border-[#E2CCA8] bg-transparent"
                  }`}
                >
                  <div className="relative w-1/2 h-16 md:h-42">
                    <Image
                      src={option.woman}
                      alt="Woman Outfit"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-1/2 h-16 md:h-42">
                    <Image
                      src={option.man}
                      alt="Man Outfit"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-2" data-aos="fade-up" data-aos-delay="300">
          <Textarea
            label={t("messageForTheCouple")}
            placeholder={t("shareYourWish")}
            value={state.message}
            onChange={(e) => actions.setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button type="button">
            <span>{t("guestsConfirmed")}</span>
            <span>({state.confirmedCount})</span>
          </Button>

          <Button type="submit" disabled={state.isSubmitting}>
            {state.isSubmitting ? t("sending") : t("sendRSVPWish")}
          </Button>
        </div>
      </form>

      <div
        className="space-y-6 text-right"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h3 className="text-2xl md:text-4xl text-center font-bold">
          {t("liveGuestbook")}
        </h3>

        {state.hasMounted && state.wishes.length > 0 ? (
          <div className="px-4 relative">
            <Carousel key={state.wishes.length} className="w-full">
              <CarouselContent>
                {state.wishes.map((w: GuestDoc) => (
                  <CarouselItem key={w.id} className="basis-full">
                    <div className="bg-primary text-white rounded-sm shadow-md space-y-4 min-h-30 flex flex-col justify-between mx-1 p-4">
                      <div className="flex flex-col justify-between items-end w-full">
                        <span className="text-xs md:text-xl mb-2">
                          {w.attendance ? (
                            <>
                              {t("attending")} - {w.guestCount}
                            </>
                          ) : (
                            <>{t("notAttending")}</>
                          )}
                        </span>
                        <span className="font-bold text-lg md:text-2xl">
                          {w.fullName}
                        </span>
                      </div>

                      {w.message && (
                        <p className="text-white/90 text-sm md:text-2xl leading-relaxed text-right my-auto">
                          &ldquo;{w.message}&rdquo;
                        </p>
                      )}
                      {state.hasMounted &&
                        state.wishes &&
                        state.wishes.length > 0 && (
                          <RsvpStatsBoard
                            getPercentageForOutfit={
                              actions.getPercentageForOutfit
                            }
                          />
                        )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {state.wishes.length > 1 && (
                <CarouselControlGroup>
                  <CarouselPrevious className="border-secondary text-secondary bg-background" />
                  <CarouselNext className="border-secondary text-secondary bg-background" />
                </CarouselControlGroup>
              )}
            </Carousel>
          </div>
        ) : (
          <p className="text-center text-sm text-primary/70 italic">
            {t("noWishesSubmittedYetBeTheFirstToLeaveAMessage")}
          </p>
        )}
      </div>
    </div>
  );
}
