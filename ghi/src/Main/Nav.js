import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

export default function Nav() {
  const { token } = useToken();
  const { user } = useUser(token);

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="http://localhost:3000/home"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="http://localhost:3000/friends"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Friends
                </a>
                <a
                  href="http://localhost:3000/signup"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </a>
                <a
                  href="http://localhost:3000/signin"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </a>
                <a
                  href="http://localhost:3000/signout"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </a>
                <a
                  href="http://localhost:3000/restaurants"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Restaurants
                </a>
                <a
                  href="http://localhost:3000/restaurants/new"
                  className="text-white hover:text-slate-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  New Restaurant
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6"></div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
