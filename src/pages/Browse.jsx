import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

const Browse = () => {
  const [userInfo, setUserInfo] = useState(null)
  const userdataCollectionRef = collection(db, "userdata");

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("uid"));
    const getData = async () => {
      const q = query(userdataCollectionRef, where("id", "==", uid));
      const docRef = await getDocs(q);
      if (docRef.docs.length > 0) {
        const doc = docRef.docs[0];
        const data = doc.data();
        setUserInfo(data)
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);
  return (
    <div className="container mx-auto min-h-screen pt-24 p-4">
      <h1 className="text-center text-3xl md:text-5xl mb-6 font-semibold ">
        Your Feed
      </h1>
      <CreatePost profUrl={userInfo?.profUrl} username={userInfo?.username} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      {createPortal(<Modal />, document.body)}
    </div>
  );
};

export default Browse;
