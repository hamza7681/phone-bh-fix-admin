import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

export const listFireStore = async (
  collectionName: string
) => {
  try {
    const collectionRef = collection(db, collectionName);
    let firestoreQuery = query(collectionRef);
    const querySnapshot = await getDocs(firestoreQuery);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    throw error;
  }
};
