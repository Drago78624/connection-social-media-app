import React from "react";
import TestProfImg from "../assets/sasuke github.jpeg";

const CreatePost = (props) => {
  return (
    <div
      className={`bg-base-200 p-4 mb-6 rounded-lg shadow-lg sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto`}
    >
      <div className="flex gap-4 items-center">
        {props.profUrl != "" ? (
          <div className="avatar">
            <div className="w-14 mask mask-hexagon">
              <img src={props.profUrl} />
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
          ></textarea>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex">
        <div className="form-control w-full">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <button className="btn btn-secondary">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
