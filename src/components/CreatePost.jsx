import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuthUid } from "../auth";

const CreatePost = (props) => {
  const postsCollectionRef = collection(db, "posts");
  const uid = getAuthUid()

  const formSchema = yup.object().shape({
    postText: yup.string().required("Please enter some text"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onCreatePost = async (data) => {
    console.log(data);
    try {
      let url = "";
      if (data.image.length > 0) {
        const imageRef = ref(
          storage,
          `posts/${data.image[0].name + v4()}`
        );
        await uploadBytes(imageRef, data.image[0]);
        url = await getDownloadURL(imageRef);
      }
      const res = await addDoc(postsCollectionRef, {
        post_text: data.postText,
        post_image: url,
        uid: uid,
        created_at: serverTimestamp(),
        likes: 0,
        comments: []
      })
      console.log("post added", res)
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      <div className="flex">
        <div className="form-control w-full">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image")}
          />
        </div>
        <div>
          <button className="btn btn-secondary">Post</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
