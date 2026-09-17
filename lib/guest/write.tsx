import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface SubmitRsvpParams {
  id?: string;
  fullName: string;
  attendance: "yes" | "no";
  guestCount: number;
  selectedOutfit?: string | null;
  message?: string;
}

export async function submitRsvpWish({
  id,
  fullName,
  attendance,
  guestCount,
  selectedOutfit,
  message,
}: SubmitRsvpParams) {
  const isAttending = attendance === "yes";
  const wishesRef = id
    ? collection(db, "events", id, "wishes")
    : collection(db, "wishes");

  return await addDoc(wishesRef, {
    fullName: fullName.trim(),
    attendance: isAttending,
    guestCount: isAttending ? Number(guestCount) : 0,
    selectedOutfit: selectedOutfit || "",
    message: message?.trim() || "",
    createdAt: serverTimestamp(),
  });
}
