import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const singleDataFireStore = async (
  toCompare: string,
  compareWith: string,
  collectionName: string
) => {
  const userRef = collection(db, collectionName);
  const newQuery = query(userRef, where(toCompare, "==", compareWith));
  const snapshot = await getDocs(newQuery);
  let data: any = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data[0];
};
