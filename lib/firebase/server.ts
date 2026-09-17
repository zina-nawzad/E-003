import "server-only";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId: "wedding003-8020c",
  clientEmail: "firebase-adminsdk-xxxxx@wedding003-8020c.iam.gserviceaccount.com",
  privateKey: `-----BEGIN PRIVATE KEY-----\nPASTE_YOUR_ACTUAL_RSA_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n`,
};

let firestore: Firestore;

if (getApps().length === 0) {
  const app = initializeApp({
    credential: cert(serviceAccount),
  });
  firestore = getFirestore(app);
} else {
  firestore = getFirestore(getApps()[0]);
}

export { firestore };