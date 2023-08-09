import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

const getUserData = async (uid) => {
  const userdataCollectionRef = collection(db, "userdata");
  const q = query(userdataCollectionRef, where("id", "==", uid));
  const docRef = await getDocs(q);
  if (docRef.docs.length > 0) {
    const doc = docRef.docs[0];
    const data = doc.data();
    return data;
  } else {
    console.log("Document does not exist");
  }
};

export default getUserData;
