import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function Nav() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  return token ? (
    <div className="navbar bg-goldSand flex">
      <div className="flex-1">
        <a
          href={`${process.env.PUBLIC_URL}/home/`}
          className="btn btn-ghost normal-case text-xl text-white"
        >
          iDunno
        </a>
      </div>
      <div className="flex-2 flex justify-center gap-2">
        <button className="btn btn-ghost">
          <a href={`${process.env.PUBLIC_URL}/friends`} className="text-white">
            Friends
          </a>
        </button>
        <button className="btn btn-ghost">
          <a
            href={`${process.env.PUBLIC_URL}/restaurants`}
            className="text-white"
          >
            Lists
          </a>
        </button>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/favicon.ico" alt="User Avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                href={`${process.env.PUBLIC_URL}/profile`}
                className="justify-between"
              >
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="navbar bg-goldSand flex">
      <div className="flex-1">
        <a
          href={`${process.env.PUBLIC_URL}/`}
          className="btn btn-ghost normal-case text-xl text-white"
        >
          iDunno
        </a>
      </div>
      <div className="flex-2 flex justify-center gap-2">
        <button className="btn btn-ghost">
          <a href={`${process.env.PUBLIC_URL}/signup`} className="text-white">
            Signup
          </a>
        </button>
        <button className="btn btn-ghost">
          <a href={`${process.env.PUBLIC_URL}/signin`} className="text-white">
            Signin
          </a>
        </button>
      </div>
    </div>
  );
}
