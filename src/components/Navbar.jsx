import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import Alert from "./Alert";

const Navbar = () => {
  const [show, setShow] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is logged in");
    } else {
      console.log("no user logged in");
    }
  });

  const onLogout = async () => {
    const result = confirm("Do you want to proceed?");
    if (result) {
      await signOut(auth);
      localStorage.removeItem("uid");
      navigate("/login");
      setShow(true)
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };
  return (
    <>
    {show && <Alert text="You've been logged out successfully!" />}
    <nav className="navbar bg-base-100 py-3 shadow-lg fixed z-10">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/browse" className="btn btn-ghost normal-case text-2xl">
            CONNECTION
          </Link>
        </div>
        <div>
          {location.pathname == "/" && (
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          )}
          {location.pathname == "/login" && (
            <Link to="/" className="btn btn-secondary">
              Sign up
            </Link>
          )}
          {location.pathname == "/browse" && (
            <button onClick={onLogout} className="btn btn-neutral">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
