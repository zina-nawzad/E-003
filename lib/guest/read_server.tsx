import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getGuest = async (id: string) => {
  if (!id) throw new Error("Missing guest id");

  const snap = await getDoc(doc(db, "guest", id));

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
};
