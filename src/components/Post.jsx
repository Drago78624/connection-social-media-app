import React from "react";
import TestProfImg from "../assets/sasuke github.jpeg";
import TestPostImg from "../assets/cat.png";
import { AiFillDelete } from "react-icons/ai";
import { BiComment, BiSolidLike } from "react-icons/bi";
import { Anchorme } from "react-anchorme";

const Post = (props) => {
  return (
    <div className={`bg-base-200 p-${props.padding} mb-${props.marginBottom} rounded-lg ${props.shadow} sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto`}>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="avatar">
            <div className="w-14 mask mask-hexagon">
              <img src={TestProfImg} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Muhammad Maaz Ahmed</h2>
            <p>1h ago</p>
          </div>
        </div>
        <div>
          <AiFillDelete fontSize="24px" />
        </div>
      </div>
      <div className="my-4 text-lg">
        <Anchorme target="_blank" className="text-error">
          Malaysia's Syazrul Idrus produced the best bowling figures in Men's
          T20I history 🙌 More ➡️ https://www.icc-cricket.com/news/3603747
        </Anchorme>
      </div>
      <div>
        <img src={TestPostImg} alt="" />
      </div>
      <div className="text-md mt-2 flex gap-2 items-center">
        <BiSolidLike />
        <p>201 likes</p>
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
