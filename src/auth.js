import { redirect } from "react-router-dom";

export const getAuthUid = () => {
    const uid = JSON.parse(localStorage.getItem("uid"))
    return uid
}

export const checkAuthLoader = () => {
  const uid = getAuthUid();

  if (!uid) {
    return redirect("/login");
  }

  return null;
};

export const checkAuthLoaderForAuthenticated = () => {
  const uid = getAuthUid();

  if (uid) {
    return redirect("/browse");
  }

  return null;
};
