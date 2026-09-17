import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface GuestDoc {
  id: string;
  fullName: string;
  attendance: boolean;
  guestCount: number;
  selectedOutfit?: string;
  message?: string;
  createdAt?: any;
}

export function useWishes(eventId?: string) {
  const [wishes, setWishes] = useState<GuestDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wishesRef = eventId
      ? collection(db, "events", eventId, "wishes")
      : collection(db, "wishes");

    const q = query(wishesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: GuestDoc[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fullName: data.fullName || data.name || "Anonymous",
            attendance: Boolean(data.attendance),
            guestCount: Number(data.guestCount ?? 1),
            selectedOutfit: data.selectedOutfit || "",
            message: data.message || "",
            createdAt: data.createdAt,
          };
        });
        setWishes(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching wishes snapshot:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [eventId]);

  return { wishes, loading };
}

export function useConfirmedStats(eventId?: string) {
  const [confirmedCount, setConfirmedCount] = useState<number>(0);

  useEffect(() => {
    const wishesRef = eventId
      ? collection(db, "events", eventId, "wishes")
      : collection(db, "wishes");

    const q = query(wishesRef, where("attendance", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const totalGuests = snapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + Number(data.guestCount ?? 1);
      }, 0);
      setConfirmedCount(totalGuests);
    });

    return () => unsubscribe();
  }, [eventId]);

  return { confirmedCount };
}
