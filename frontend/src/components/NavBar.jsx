import React from "react";
import { Link } from "react-router-dom";
import note from "../note.svg";
import authStore from "../stores/authStore";

const NavBar = () => {
  const store = authStore();
  console.log(store.loggedIn);

  return (
    <div className="flex justify-between p-5 bg-slate-300">
      <div className="">
        <Link to={"/"} className="flex items-center">
          <img alt={"note"} src={note} width="40" height="40" />
          <span className="text-3xl font-bold">Notes</span>
        </Link>
      </div>
      <ul className="flex gap-5">
        {!store.loggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={"/logout"}>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
