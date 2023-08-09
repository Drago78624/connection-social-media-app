import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const userdataCollectionRef = collection(db, "userdata");

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("uid"));
    const getUserData = async () => {
      const q = query(userdataCollectionRef, where("id", "==", uid));
      const docRef = await getDocs(q);
      if (docRef.docs.length > 0) {
        const doc = docRef.docs[0];
        const data = doc.data();
        setUserInfo(data);
      } else {
        console.log("Document does not exist");
      }
    };
    const getPostUserData = async (uid) => {
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
    const getPostsData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = querySnapshot.docs.map((doc) => {
        const postData = doc.data();
        const userData = getPostUserData(postData.uid);
        return {
          ...postData,
          ...userData
        };
      });
      setPosts(posts);
    };
    getPostsData();
    getUserData();
  }, []);

  return (
    <div className="container mx-auto min-h-screen pt-24 p-4">
      <h1 className="text-center text-3xl md:text-5xl mb-6 font-semibold ">
        Your Feed
      </h1>
      <CreatePost profUrl={userInfo?.profUrl} username={userInfo?.username} />
      {posts &&
        posts.map((post) => {
          const timeInMiliseconds = post?.created_at?.seconds * 1000;
          const timeAgo = moment(timeInMiliseconds).fromNow();
          return (
            <Post
              marginBottom={6}
              shadow="shadow-lg"
              padding={4}
              postText={post?.post_text}
              postImg={post?.post_image}
              likes={post?.likes}
              timestamp={timeAgo}
              username={post?.username}
              profImg={post?.profUrl}
              uid={post?.id}
            />
          );
        })}

      {createPortal(<Modal />, document.body)}
    </div>
  );
};

export default Browse;
