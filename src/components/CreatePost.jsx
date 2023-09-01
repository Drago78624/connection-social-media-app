import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../contexts/UserContextProvider";
import { getPostsData } from "../pages/Browse";
import Alert from "./Alert";

const CreatePost = (props) => {
  const postsCollectionRef = collection(db, "posts");
  const userCtx = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const formSchema = yup.object().shape({
    postText: yup.string().required("Please enter some text"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const fetchingPosts = async () => {
    const fetchedPosts = await getPostsData();
    props.setPosts(fetchedPosts);
  };

  const onCreatePost = async (data) => {
    setLoading(true);
    try {
      let url = "";
      if (data.image.length > 0) {
        const imageRef = ref(storage, `posts/${data.image[0].name + v4()}`);
        await uploadBytes(imageRef, data.image[0]);
        url = await getDownloadURL(imageRef);
      }
      const res = await addDoc(postsCollectionRef, {
        post_text: data.postText,
        post_image: url,
        uid: userCtx.userData.id,
        created_at: serverTimestamp(),
        likes: 0,
        comments: [],
        username: userCtx.userData.username,
        profUrl: userCtx.userData.profUrl,
      });
      setLoading(false);
      fetchingPosts();
      setShow(true)
      setTimeout(() => {
        setShow(false);
      }, 3000);
      reset();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {show && <Alert text="Post has been posted successfully!" />}
      <form
        className={`bg-base-200 p-4 mb-6 rounded-lg shadow-lg sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto`}
        onSubmit={handleSubmit(onCreatePost)}
      >
        <div className="flex gap-4 items-start">
          {props.profUrl != "" ? (
            <div className="avatar">
              <div className="w-14 mask mask-hexagon">
                <img className="object-contain" src={props.profUrl} />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
                <span className="text-3xl">{props.username[0]}</span>
              </div>
            </div>
          )}

          <div className="form-control w-full">
            <textarea
              className="textarea textarea-bordered text-lg"
              placeholder="What's on your mind ?"
              {...register("postText")}
            ></textarea>
            <p className="text-error mt-1">
              {errors.postText && errors.postText.message}
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <div className="form-control">
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("image")}
            />
          </div>
          <div>
            {loading ? (
              <button className="btn btn-secondary">
                <span className="loading loading-spinner"></span>
                Posting
              </button>
            ) : (
              <button className="btn btn-secondary">Post</button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
