import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function Nav() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return token ? (
    <div className="navbar bg-darkCyan flex">
      <div className="flex-1">
        <Link
          to="/home"
          className="btn btn-ghost normal-case text-xl text-white"
        >
          iDunno
        </Link>
      </div>
      <div className="flex-2 flex justify-center gap-2">
        <Link to="/friends">
          <button className="btn btn-ghost text-white">Friends</button>
        </Link>
        <Link to="/restaurants">
          <button className="btn btn-ghost text-white">Lists</button>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user && user.profile_picture_url
                    ? user.profile_picture_url
                    : "/favicon.ico"
                }
                alt="User Avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <span onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="navbar bg-darkCyan flex">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          iDunno
        </Link>
      </div>
      <div className="flex-2 flex justify-center gap-2">
        <Link to="/signup">
          <button className="btn btn-ghost text-white">Signup</button>
        </Link>
        <Link to="/signin">
          <button className="btn btn-ghost text-white">Signin</button>
        </Link>
      </div>
    </div>
  );
}
