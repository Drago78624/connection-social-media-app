import React from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const removeAuthUid = () => {
    localStorage.removeItem("uid")
    navigate("/login")
}
  return (
    <nav className="navbar bg-base-100 py-3 shadow-lg fixed">
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
            <button onClick={removeAuthUid} className="btn btn-neutral">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
