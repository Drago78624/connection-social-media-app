import { redirect } from "react-router-dom";

export const getAuthUid = () => {
    const uid = localStorage.getItem("uid")
    // const uid = null
    return uid
}

export const checkAuthLoader = () => {
  const uid = getAuthUid();

  if (!uid) {
    return redirect("/login");
  }

  return null;
};
