import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is logged in")
    } else { 
      console.log("no user logged in")
    }
  });

  const onLogout = async () => {
    await signOut(auth)
    localStorage.removeItem("uid")
    navigate("/login")
  }
  return (
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
  );
};

export default Navbar;
