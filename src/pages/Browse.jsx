import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";
import { UserContext } from "../contexts/UserContextProvider";

export const getPostsData = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = querySnapshot.docs.map((doc) => {
    const postData = doc.data();
    return postData;
  });
  return posts
};

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const fetchingPosts = async () => {
      const fetchedPosts = await getPostsData()
      setPosts(fetchedPosts)
    }
    fetchingPosts()
  }, []);


  return (
    <div className="container mx-auto min-h-screen pt-24 p-4">
      <h1 className="text-center text-3xl md:text-5xl mb-6 font-semibold ">
        Your Feed
      </h1>
      <CreatePost
        profUrl={userCtx.userData?.profUrl}
        username={userCtx.userData?.username}
        setPosts={setPosts}
      />
      {posts.length > 0 &&
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
