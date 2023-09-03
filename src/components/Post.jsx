import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiComment, BiSolidLike } from "react-icons/bi";
import { Anchorme } from "react-anchorme";
import { getAuthUid } from "../auth";

const Post = (props) => {
  const uid = getAuthUid();
  const [deletingPostId, setDeletingPostId] = useState(null)

  return (
    <div
      className={`bg-base-200 p-${props.padding} mb-${props.marginBottom} rounded-lg ${props.shadow} sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto`}
    >
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="avatar">
            <div className="w-14 mask mask-hexagon">
              <img src={props.profImg} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">{props.username}</h2>
            <p>{props.timestamp}</p>
          </div>
        </div>
        {props.uid === uid && (
          <button
            className="btn"
            onClick={() => {
              setDeletingPostId(props.id); // set the id of the post being deleted
              props.onDeletePost(props.id);
            }}
            disabled={deletingPostId === props.id} // disable the button of the post being deleted
          >
            {deletingPostId === props.id ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <AiFillDelete fontSize="24px" />
            )}
          </button>
        )}
      </div>
      <div className="my-4 text-lg">
        <Anchorme target="_blank" className="text-error">
          {/* Malaysia's Syazrul Idrus produced the best bowling figures in Men's
          T20I history 🙌 More ➡️ https://www.icc-cricket.com/news/3603747 */}
          {props.postText}
        </Anchorme>
      </div>
      {props.postImg && (
        <div>
          <img src={props.postImg} alt="" />
        </div>
      )}
      <div className="text-md mt-2 flex gap-2 items-center">
        <BiSolidLike />
        <p>{props.likes} likes</p>
      </div>
      <div className="divider my-0 py-0"></div>
      <div className="flex mt-2">
        <button className="btn btn-ghost flex-1">
          <BiSolidLike /> Like
        </button>
        <button
          onClick={() => window.my_modal_2.showModal()}
          className="btn btn-ghost flex-1"
        >
          <BiComment /> Comment
        </button>
      </div>
    </div>
  );
};

export default Post;
