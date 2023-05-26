import React, { useEffect, useState } from "react";

export default function Nav() {
  return (
    <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <a href="http://localhost:3000/home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Idunno</a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="http://localhost:3000/friends" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Friends</a>
            <a href="http://localhost:3000/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signin</a>
            <a href="http://localhost:3000/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</a>
            <a href="http://localhost:3000/signout" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signout</a>
            <a href="http://localhost:3000/restaurants" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Restaurants</a>
            <a href="http://localhost:3000/restaurants/new" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Restaurants New</a>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
      </div>
    </div>
  </div>
</nav>
  );
}



