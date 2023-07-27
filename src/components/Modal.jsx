import React from "react";
import Post from "./Post";
import TestProfImg from "../assets/sasuke github.jpeg";
import { BiSend } from "react-icons/bi";

const Modal = () => {
  return (
    <dialog id="my_modal_2" className="modal">
      <form
        method="dialog"
        className="modal-box min-w-fit bg-base-200 p-4 mx-auto"
      >
        <Post marginBottom={0} shadow={0} padding={0} />
        <div className="mt-3 overflow-y-scroll max-h-32">
          <div className="chat chat-start mb-4">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={TestProfImg} />
              </div>
            </div>
            <div className="chat-bubble">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
          <div className="chat chat-start mb-4">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={TestProfImg} />
              </div>
            </div>
            <div className="chat-bubble">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
          <div className="chat chat-start mb-4">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={TestProfImg} />
              </div>
            </div>
            <div className="chat-bubble">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={TestProfImg} />
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Write a comment..."
                className="input input-bordered w-full shadow-lg"
              />
            </div>
              <button className="btn btn-square btn-secondary">
                <BiSend fontSize={24} />
              </button>
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
