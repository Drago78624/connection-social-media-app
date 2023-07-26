import React from "react";
import Post from "./Post";

const Modal = () => {
  return (
    <dialog id="my_modal_2" className="modal">
      <form method="dialog" className="modal-box min-w-fit p-0">
        <Post />
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
